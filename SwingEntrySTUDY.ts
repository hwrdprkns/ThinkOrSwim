# SWINGENTRY
# WGRIFFITH2 (C) 2014

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# RSI
def RSI = RSIWilder();

# VOLUME
def VOL = VolumeAvg() > VolumeAvg(length = 60).VolAvg;

def GREENPRICE = 
MACD >= 0 and
FASTLINE >= SLOWLINE;

def REDPRICE =
MACD < 0 and
FASTLINE < SLOWLINE;

plot BULLISH = !REDPRICE
and RSI < 60
and close > close[1]
and close > open
and VOL;

plot BEARISH = !GREENPRICE
and RSI > 60
and close < close[1]
and close < open
and VOL;

BULLISH.SetDefaultColor(CreateColor(0, 255, 0));
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

BEARISH.SetDefaultColor(CreateColor(255, 0, 0));
BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

#########################################