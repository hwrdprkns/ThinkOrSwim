# SwingTrend
# WGRIFFITH2 (c) 2014

input price = close;
input length = 14;
input sma_length = 12;
input paintBars = yes;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# RSI
#def rsi = reference RSIWilder(price = price, length = length);
#def SMA = SimpleMovingAvg(price = rsi, length = sma_length);

# MACD
def MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);

def GreenPrice = MACD >= 0 and FASTLINE >= SLOWLINE;
def RedPrice = MACD < 0 and FASTLINE < SLOWLINE;

plot Bullish = GreenPrice;
plot Neutral = !GreenPrice and !RedPrice;
plot Bearish = RedPrice;

BULLISH.SetDefaultColor(Color.UPTICK);
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
BULLISH.SetLineWeight(3);
BULLISH.Hide();
NEUTRAL.SetDefaultColor(Color.GRAY);
NEUTRAL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
NEUTRAL.SetLineWeight(3);
NEUTRAL.Hide();
BEARISH.SetDefaultColor(Color.DOWNTICK);
BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
BEARISH.SetLineWeight(3);
BEARISH.Hide();

DefineGlobalColor("Bullish", Color.UPTICK);
DefineGlobalColor("Neutral", Color.GRAY);
DefineGlobalColor("Bearish", Color.DOWNTICK);
AssignPriceColor(if !paintBars then Color.CURRENT else if GreenPrice then GlobalColor("Bullish") else if RedPrice then GlobalColor("Bearish") else GlobalColor("Neutral"));

#############################################################