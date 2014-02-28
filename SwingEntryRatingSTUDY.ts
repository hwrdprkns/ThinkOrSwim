# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

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

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA50 = close > SimpleMovingAvg(LENGTH = 50);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot RATING =

if
!Redprice
and SMA200 and !SMA50 and !SMA20
and RelativeVolume >= 1.0
and close >= ohlc4[1]
then 1

else if
!Redprice
and SMA200 and !SMA50 and !SMA20
and close >= ohlc4[1]
then .5

else if
!GreenPrice
and SMA200 and SMA50 and SMA20
and close <= ohlc4[1]
then -.5

else if
!GreenPrice
and SMA200 and SMA50 and SMA20
and RelativeVolume >= 1.0
and close <= ohlc4[1]
then -1

else 0;