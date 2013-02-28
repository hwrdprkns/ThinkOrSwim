##############StochasticSlowReversal#############
# WGRIFFITH2 (c) 2013

input kperiod = 14;
input dperiod = 3;
input over_bought = 80;
input over_sold = 20;

def FASTLINE = Round(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod), length = dperiod));

plot Above = FASTLINE crosses above SLOWLINE;
plot Below = FASTLINE crosses below SLOWLINE;

Below.SetDefaultColor(Color.DOWNTICK);
Below.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Above.SetDefaultColor(Color.UPTICK);
Above.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

##############################################