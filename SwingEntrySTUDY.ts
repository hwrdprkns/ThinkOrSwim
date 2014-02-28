# SWINGENTRY
# WGRIFFITH2 (C) 2014

input periods = 2;

declare upper;

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

# HIGHS / LOWS
def ROLLINGLOW = Lowest(DATA = low, LENGTH = periods)[1];
def ROLLINGHIGH = Highest(DATA = high, LENGTH = periods)[1];

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA50 = close > SimpleMovingAvg(LENGTH = 50);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot BULL =
SMA200 and !SMA50 and !SMA20
and RelativeVolume >= 1.0
and close >= ROLLINGHIGH;

plot BEAR =
!SMA200 and SMA50 and SMA20
and RelativeVolume >= 1.0
and close <= ROLLINGLOW;

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);