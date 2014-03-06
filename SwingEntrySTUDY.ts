# SWINGENTRY
# WGRIFFITH2 (C) 2014

input length = 5;
input ob = 75;
input os = 25;

declare upper;

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

plot BULL =
!Redprice
and RSI[1] <= os
and RSI > os
and RelativeVolume >= 1.0;

plot BULLLITE =
!Redprice 
and RSI[1] <= os
and RSI > os;

plot BEAR =
!GreenPrice
and RSI[1] >= ob
and RSI < ob
and RelativeVolume >= 1.0;

plot BEARLITE =
!GreenPrice
and RSI[1] >= ob
and RSI < ob;

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLLITE.SetDefaultColor(CreateColor(128, 128, 128));
BULLLITE.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARLITE.SetDefaultColor(CreateColor(128, 128, 128));
BEARLITE.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);