# SwingAlertIntraday
# DREWGRIFFITH15 (C) 2014

declare upper;
input kperiod = 14;
input dperiod = 1;
input overbought = 80;
input oversold = 20;
input MA1 = 10;
input MA2 = 250;
input averageType = AverageType.EXPONENTIAL;

# STOCHASTICSLOW
def FASTLINE = round(StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD),0);

# Trying to remove oscillations
def SMA1 = expAverage(close,MA1);
def SMA2 = expAverage(close,MA2);

DEF BULLISH =
((close < SMA1 and close > SMA2)
or (close > SMA1 and close < SMA2))
and lowest(FASTLINE,2)[1] <= oversold
and FASTLINE > oversold;

PLOT BUY = BULLISH;

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BUY.AssignValueColor(Color.GREEN);
