# SWINGTREND
# WGRIFFITH2 (C) 2014

def PAINTBARS = yes;
input kPERIOD1 = 20;
input DPERIOD1 = 3;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("D PERIOD" = DPERIOD1, "k period" = kPERIOD1);
def SLOWLINE = StochasticSlow("D PERIOD" = DPERIOD1, "k period" = kPERIOD1).SLOWD;

# TEST
def GREENPRICE = FASTLINE >= SLOWLINE;
def REDPRICE = FASTLINE < SLOWLINE;

plot BULLISH = GREENPRICE;
plot NEUTRAL = !GREENPRICE and !REDPRICE;
plot BEARISH = REDPRICE;

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

DefineGlobalColor("BULLISH", Color.UPTICK);
DefineGlobalColor("NEUTRAL", Color.GRAY);
DefineGlobalColor("BEARISH", Color.DOWNTICK);
AssignPriceColor(if !PAINTBARS then Color.CURRENT else if GREENPRICE then GlobalColor("BULLISH") else if REDPRICE then GlobalColor("BEARISH") else GlobalColor("NEUTRAL"));