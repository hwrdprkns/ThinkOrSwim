# SwingTraderLongEntry

# Designed for use on daily charts
# The InSync Index is used detect extreme levels.
# Values higher or equal to 55 are considered to be high extreme levels. (sell)
# Values lower or equal than -55 are considered to be low extreme levels. (buy)

input dollar_amt = 5000;
input price = close;
input RSI_Target = 75;
input rsi_length = 2;
input rsi_ob = 95;
input rsi_os = 5;

## ENTRY
# Study Definitions
def smooth = 1;
def bbCalc = BollingerPercentB();
def macd1 = MACD(8, 17);
def macd2 = macd1 - (MACD(8, 10) - MACD(17, 20));
def rsi = reference RSI(length = 2);
def change = RateOfChange(10);
def dpo = DetrendedPriceOsc();
def eom = EaseOfMovement();
def mf = MoneyFlowIndex();
def stoch = StochasticFull("k period" = 5);
def bomp = BalanceOfMarketPower();
def cc = CCI();

# Indicator Scoring
def bb = if bbCalc > 95 then 5 else if bbCalc < 5 then -5 else 0;
def cci = if cc > 100 then 5 else if cc < -100 then -5 else 0;
def macd = if macd1 > 0 and macd2 > 0 then 5 else if macd1 < 0 and macd2 < 0 then -5 else 0;
def roc = if change > 1 and change > ExpAverage(change, 10) then 5 else if change < 1 and change < ExpAverage(change, 10) then -5 else 0;
def sto = if stoch > 80 then 10 else if stoch < 20 then -10 else 0;
def rsiW = if rsi > 95 then 5 else if rsi < 5 then -5 else 0;
def bop = if bomp > 0 and bomp > ExpAverage(bomp, 10) then 5 else if bomp < 0 and bomp < ExpAverage(bomp, 10) then
-5 else 0;
def dp = if dpo > 0 then 5 else if dpo < 0 then -5 else 0;
def emv = if eom > 0 then 5 else if eom < 0 then -5 else 0;
def mfi = if mf > 50 then 5 else if mf < 40 then -5 else 0;

# Point Sum / Plot
def sum = bb + cci + macd + roc + sto + rsiW + bop + dp + emv + mfi;
def inSync = ExpAverage(sum, smooth);
def entry = inSync == -55;

## EXIT
def entryPrice = entryPrice();
def pricetarget = if entryPrice then max(high[1],entryPrice) else Double.NaN;

def target = high >= pricetarget or rsi >= RSI_Target;

def Shares = AbsValue(Round(dollar_amt / close));

AddOrder(condition = entry is true, tradeSize = Shares, tickcolor = GetColor(0), arrowcolor = GetColor(0), name = "LE", price = close()[0]);
AddOrder(OrderType.SELL_TO_CLOSE, target is true, tradeSize = Shares, tickcolor = GetColor(1), arrowcolor = GetColor(1), name = "LX", price = pricetarget);

##################################################
