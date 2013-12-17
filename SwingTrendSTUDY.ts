# SwingTrend
# WGRIFFITH2 (c) 2013

input price = close;
input length = 14;
input sma_length = 12;
input paintBars = yes;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);

def GreenPrice = MACD >= 0 and FASTLINE >= SLOWLINE;
def RedPrice = MACD < 0 and FASTLINE < SLOWLINE;

plot Bullish = GreenPrice;
plot Neutral = !GreenPrice and !RedPrice;
plot Bearish = RedPrice;

Bullish.SetDefaultColor(Color.UPTICK);
Bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bullish.SetLineWeight(3);
Bullish.Hide();
Neutral.SetDefaultColor(Color.BLUE);
Neutral.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Neutral.SetLineWeight(3);
Neutral.Hide();
Bearish.SetDefaultColor(Color.DOWNTICK);
Bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bearish.SetLineWeight(3);
Bearish.Hide();

DefineGlobalColor("Bullish", Color.UPTICK);
DefineGlobalColor("Neutral", Color.BLUE);
DefineGlobalColor("Bearish", Color.DOWNTICK);
AssignPriceColor(if !paintBars then Color.CURRENT else if GreenPrice then GlobalColor("Bullish") else if RedPrice then GlobalColor("Bearish") else GlobalColor("Neutral"));

#############################################################