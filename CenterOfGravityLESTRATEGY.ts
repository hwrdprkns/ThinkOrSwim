# CenterOfGravity
# WGRIFFITH2 (C) 2015

input price = close;
input length = 10;
input rsi_length = 2;
input kperiod = 5;
input ExtremeValue = 2.6; # 4.6 if funds are more volatile

def MoneyWave = STOCHASTICSLOW("K PERIOD" = KPERIOD);

# Hurst Osc or COG
def displacement = (-length / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(length)) else
CMA[1] + (CMA[1] - CMA[2]);

def OscValue = if close > close[1] then high else if close < close[1] then
low else (high + low) / 2;

def HurstOsc = ((100 * OscValue / CMA) - 100);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

def entry = HurstOsc < -ExtremeValue and RSI <= 5 and MoneyWave <= 20; # and Close >= SimpleMovingAvg(length = 200);

def target = RSI >= 75;

DEF SHARES = ROUND(2000 / CLOSE);
DEF FOOBAR = SHARES;

#LONG POSITION:
AddOrder(condition = ENTRY is true, TRADESIZE = FOOBAR, TICKCOLOR = GetColor(0), ARROWCOLOR = GetColor(0), NAME = "LE", price = close()[0], type = OrderType.BUY_TO_OPEN);
ADDORDER(OrderType.SELL_TO_CLOSE, target IS TRUE, TRADESIZE = FOOBAR, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX", PRICE = Close());

##################################################
