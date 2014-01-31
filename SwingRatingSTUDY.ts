# SWINGRATING
# WGRIFFITH2 (C) 2014

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# VOLUME
def VOL = VolumeAvg() > VolumeAvg(LENGTH = 60).VOLAVG;

def GREENPRICE = 
MACD >= 0 and
FASTLINE >= SLOWLINE;

def REDPRICE =
MACD < 0 and
FASTLINE < SLOWLINE;

plot RATING =

if GREENPRICE
then 1

else if !GREENPRICE
and !REDPRICE
then 0

else -1;

RATING.SetDefaultColor(CreateColor(0, 255, 0));
RATING.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);