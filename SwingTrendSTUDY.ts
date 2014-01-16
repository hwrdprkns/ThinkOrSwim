# SWINGTREND
# WGRIFFITH2 (C) 2013

def PAINTBARS = yes;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

#def RSI = RSIWilder(PRICE = CLOSE, LENGTH = 14);
#def SMA = SimpleMovingAvg(PRICE = RSI, LENGTH = 12);

def GREENPRICE = #RSI >= SMA and 
MACD >= 0 and 
FASTLINE >= SLOWLINE;
def REDPRICE = #RSI < SMA and
MACD < 0 and
FASTLINE < SLOWLINE;

plot BULLISH = GREENPRICE;
plot NEUTRAL = !GREENPRICE and !REDPRICE;
plot BEARISH = REDPRICE;

BULLISH.SetDefaultColor(Color.UPTICK);
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
BULLISH.SetLineWeight(3);
BULLISH.Hide();
NEUTRAL.SetDefaultColor(Color.BLUE);
NEUTRAL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
NEUTRAL.SetLineWeight(3);
NEUTRAL.Hide();
BEARISH.SetDefaultColor(Color.DOWNTICK);
BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
BEARISH.SetLineWeight(3);
BEARISH.Hide();

DefineGlobalColor("BULLISH", Color.UPTICK);
DefineGlobalColor("NEUTRAL", Color.BLUE);
DefineGlobalColor("BEARISH", Color.DOWNTICK);
AssignPriceColor(if !PAINTBARS then Color.CURRENT else if GREENPRICE then GlobalColor("BULLISH") else if REDPRICE then GlobalColor("BEARISH") else GlobalColor("NEUTRAL"));

#############################################################