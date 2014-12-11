# SwingAlertIntraday
# DREWGRIFFITH15 (C) 2014

declare upper;
def kperiod = 14;
def dperiod = 1;
def overbought = 80;
def oversold = 20;
def MA1 = 10;
def MA2 = 250;
def averageType = AverageType.EXPONENTIAL;

# STOCHASTICSLOW
def FASTLINE = round(StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD),0);

# MACD
def MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);

# Trying to remove oscillations
def SMA1 = expAverage(close,MA1);
def SMA2 = expAverage(close,MA2);

DEF BULLISH =
SMA1 crosses above SMA2
or (((close > SMA2)
or (close > SMA1 and close < SMA2))
and close > midBodyVal()[1]
and lowest(FASTLINE,2)[1] <= oversold
and FASTLINE > oversold
and MACD >= 0);

PLOT BUY = BULLISH;

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BUY.AssignValueColor(Color.GREEN);
