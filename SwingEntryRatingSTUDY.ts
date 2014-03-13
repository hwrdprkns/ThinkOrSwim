# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

input length = 5;
input ob = 75;
input os = 25;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# OSCILLATOR TEST
def GREENPRICE = MACD >= 0 and FASTLINE >= SLOWLINE;
def REDPRICE = MACD < 0 and FASTLINE < SLOWLINE;

# RSI
def NetChgAvg = WildersAverage(close - close[1], length);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

# SMA TEST
def SMA200 = close >= SimpleMovingAvg(LENGTH = 200);
def SMA50 = close >= SimpleMovingAvg(LENGTH = 50);
def SMA20 = close >= SimpleMovingAvg(LENGTH = 20);

plot RATING =

if
SMA200 and !SMA50 and !SMA20
and RSI[1] <= os
and RSI > os
then 1

else if
!SMA200 and SMA50 and SMA20
and RSI[1] >= ob
and RSI < ob
then -1

else 0;