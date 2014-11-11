# SwingAlertHourly
# DREWGRIFFITH15 (C) 2014

declare upper;
input kperiod = 90;
input dperiod = 1;
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input MA = 10; #5 Daily
input overbought = 40;
input oversold = 20;
input averageType = AverageType.EXPONENTIAL;

# MACD
def Value = MovingAverage(averageType, close, fastLength) - MovingAverage(averageType, close, slowLength);
def Avg = MovingAverage(averageType, Value, MACDLength);
def Diff = Value - Avg;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD);

# MOVING AVG
def SMA = simplemovingavg(close,MA);

DEF BULLISH =
close > SMA
and Diff > 0
and FASTLINE >= oversold
and FASTLINE <= overbought;

PLOT BUY = BULLISH;

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BUY.AssignValueColor(Color.GREEN);
