# SWINGENTRY
# WGRIFFITH2 (C) 2014

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

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA50 = close > SimpleMovingAvg(LENGTH = 50);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot BULL =
!Redprice
and SMA200 and !SMA50 and !SMA20
and RelativeVolume >= 1.0
and close >= ohlc4[1];

plot BULLLITE =
!Redprice
and SMA200 and !SMA50 and !SMA20
and close >= ohlc4[1];

plot BEAR =
!GreenPrice
and !SMA200 and SMA50 and SMA20
and RelativeVolume >= 1.0
and close <= ohlc4[1];

plot BEARLITE =
!GreenPrice
and !SMA200 and SMA50 and SMA20
and close <= ohlc4[1];

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLLITE.SetDefaultColor(CreateColor(0, 255, 0));
BULLLITE.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARLITE.SetDefaultColor(CreateColor(255, 0, 0));
BEARLITE.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);