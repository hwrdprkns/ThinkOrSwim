# SwingTrend
# WGRIFFITH2 (c) 2014

declare upper;
input SLOWK = 14;
input SLOWD = 3;
input MACD_FAST = 5;
input MACD_SLOW = 25;
input MACD_LENGTH = 5;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("k period" = SLOWK, "d period" = SLOWD);
def SLOWLINE = StochasticSlow("k period" = SLOWK, "d period" = SLOWD).SlowD;

# MACD
def MACD = MACDHistogram("fast length" = MACD_FAST, "slow length" = MACD_SLOW, "macd length" = MACD_LENGTH);

def GreenPrice = MACD >= 0 and FASTLINE >= SLOWLINE;
def RedPrice = MACD <= 0 and FASTLINE <= SLOWLINE;

plot Bullish = GreenPrice;
plot Neutral = !GreenPrice and !RedPrice;
plot Bearish = RedPrice;

plot RATING =
if GreenPrice then 1
else if RedPrice then .5
else 0;

def PAINTBARS = yes;

Bullish.SetDefaultColor(Color.UPTICK);
Bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bullish.SetLineWeight(3);
Bullish.Hide();
Neutral.SetDefaultColor(Color.GRAY);
Neutral.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Neutral.SetLineWeight(3);
Neutral.Hide();
Bearish.SetDefaultColor(Color.DOWNTICK);
Bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bearish.SetLineWeight(3);
Bearish.Hide();
RATING.Hide();
RATING.HideBubble();

DefineGlobalColor("BULLISH", Color.UPTICK);
DefineGlobalColor("NEUTRAL", Color.GRAY);
DefineGlobalColor("BEARISH", Color.DOWNTICK);
AssignPriceColor(if !PAINTBARS then Color.CURRENT else if GreenPrice then GlobalColor("BULLISH") else if RedPrice then GlobalColor("BEARISH") else GlobalColor("NEUTRAL"));
