##############StochasticSlowTrend#############
# WGRIFFITH2 (c) 2013

input paintBars = yes;
input kperiod = 14;
input dperiod = 3;
input over_bought = 80;
input over_sold = 20;

def FASTLINE = Round(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod), length = dperiod));
def GreenPrice = FASTLINE > SLOWLINE;
def RedPrice = FASTLINE < SLOWLINE;

plot Bullish = GreenPrice;
plot Neutral = !GreenPrice and !RedPrice;
plot Bearish = RedPrice;

Bullish.SetDefaultColor(Color.UPTICK);
Bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bullish.SetLineWeight(3);
Bullish.hide();
Neutral.SetDefaultColor(Color.BLUE);
Neutral.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Neutral.SetLineWeight(3);
Neutral.hide();
Bearish.SetDefaultColor(Color.DOWNTICK);
Bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bearish.SetLineWeight(3);
Bearish.hide();

DefineGlobalColor("Bullish", Color.UPTICK);
DefineGlobalColor("Neutral", Color.BLUE);
DefineGlobalColor("Bearish", Color.DOWNTICK);
AssignPriceColor(if !paintBars then Color.CURRENT else if GreenPrice then globalColor("Bullish") else if RedPrice then globalColor("Bearish") else globalColor("Neutral"));

##############StochasticSlowTrend#############