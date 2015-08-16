# InSync

# This is index is formed from signals on a variety of different technical indicators, and used
# to determine extreme overbought/oversold values in the market.
# Originally coded by Eric Rasmussen and modified by Drew Griffith
#
# The InSync Index is used detect extreme levels.
# Values higher or equal to 55 are considered to be high extreme levels. (short)
# Values lower or equal than -55 are considered to be low extreme levels. (long)

# Designed for use on daily charts

declare lower;

# Data Smoothing Input
input smooth = 1;

# Study Definitions
def bbCalc = bollingerPercentB();
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

# Point Sum
def sum = bb + cci + macd + roc + sto + rsiW + bop + dp + emv + mfi;

# Plots
plot inSync = ExpAverage(sum, smooth);
plot zero = if IsNaN(close) then Double.NaN else 0;
plot pos55 = if IsNaN(close) then Double.NaN else 55;
plot neg55 = if IsNaN(close) then Double.NaN else -55;
inSync.AssignValueColor(if sum > 0 then Color.RED else  Color.GREE);
inSync.SetLineWeight(2);
zero.AssignValueColor(Color.LIGHT_GRAY);
pos55.AssignValueColor(Color.GREEN);
neg55.AssignValueColor(Color.RED);
zero.HideTitle();
pos55.HideTitle();
neg55.HideTitle();

# Alerts
alert((sum == -55), "inSync LE", "alert type" = Alert.BAR, sound = Sound.Ding);
alert((sum == 55), "inSync SE", "alert type" = Alert.BAR, sound = Sound.Ding);
