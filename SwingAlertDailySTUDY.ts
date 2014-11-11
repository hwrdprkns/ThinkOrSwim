# SwingAlertDaily
# DREWGRIFFITH15 (C) 2014

declare upper;
input SLOWK1 = 5;
input SLOWK2 = 14;
input overbought = 80;
input oversold = 20;
INPUT TRAIL = 2;
INPUT DISPLACE = 1;
INPUT AGGREGATIONPERIOD = AGGREGATIONPERIOD.DAY;

# STOCHASTICSLOW
def FASTLINE1 = StochasticSlow("k period" = SLOWK1, "d period" = 1);
def FASTLINE2 = StochasticSlow("k period" = SLOWK2, "d period" = 1);

def NEW_HIGH = CLOSE > HIGHEST(HIGH(PERIOD = AGGREGATIONPERIOD), TRAIL)[DISPLACE];

def GreenPrice =
NEW_HIGH
and (lowest(FASTLINE1,2)[1] <= oversold
or lowest(FASTLINE2,2)[1] <= oversold);

plot BULLISH =
GreenPrice and !GreenPrice[1];

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);
