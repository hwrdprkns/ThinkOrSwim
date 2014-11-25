# SwingAlertDaily
# DREWGRIFFITH15 (C) 2014

declare upper;
input SLOWK = 14;
input SLOWD = 3;
input overbought = 80;
input oversold = 20;
INPUT TRAIL = 2;
INPUT DISPLACE = 1;
INPUT AGGREGATIONPERIOD = AGGREGATIONPERIOD.DAY;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("k period" = SLOWK, "d period" = SLOWD);

def NEW_HIGH = CLOSE > HIGHEST(HIGH(PERIOD = AGGREGATIONPERIOD), TRAIL)[DISPLACE];

def GreenPrice =
NEW_HIGH
and (lowest(FASTLINE,2)[1] <= oversold);

plot BULLISH =
GreenPrice and !GreenPrice[1];

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);
