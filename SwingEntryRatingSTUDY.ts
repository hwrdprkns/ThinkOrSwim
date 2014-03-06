# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

input length = 5;
input ob = 75;
input os = 25;

declare lower;

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

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

plot RATING =

if
!Redprice
and RSI[1] <= os
and RSI > os
and RelativeVolume >= 1.0
then 1

else if
!Redprice 
and RSI[1] <= os
and RSI > os
then .5

else if
!GreenPrice
and RSI[1] >= ob
and RSI < ob
and RelativeVolume >= 1.0
then -1

else if
!GreenPrice
and RSI[1] >= ob
and RSI < ob
then -.5

else 0;