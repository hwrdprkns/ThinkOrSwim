# SCTR
# DREWGRIFFITH15 (C) 2014

declare lower;

input SMA200 = 200;
input ROC125 = 125;
input SMA50 = 50;
input ROC20 = 20;
input PPO_HIST = 3;
input RSI = 14;
input LT_WEIGHT = .30;
input MD_WEIGHT = .15;
input SH_WEIGHT = .05;
input SR_LENGTH = 40;

# THIS STUDY IS A REPLICATION OF STOCKCHARTS TECHNICAL RANKING
# http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:sctr

#Long-Term Indicators (weighting)
#  * Percent above/below 200-day SMA (30%)
#  * 125-Day Rate-of-Change (30%)

def SM200 = SimpleMovingAvg(close, SMA200);
def LTSMA = ((close - SM200) / ((close + SM200) / 2));
def LTROC = if close[ROC125] > 0 then (close / close[ROC125] - 1) * 100 else 0;
def LT = (LTSMA + LTROC) * LT_WEIGHT;

#Medium-Term Indicators (weighting)
#  * Percent above/below 50-day SMA  (15%)
#  * 20-day Rate-of-Change (15%)

def SM50 = SimpleMovingAvg(close, SMA50);
def MDSMA = ((close - SM50) / ((close + SM50) / 2));
def MDROC = if close[ROC20] > 0 then (close / close[ROC20] - 1) * 100 else 0;
def MD = (MDSMA + MDROC) * MD_WEIGHT;

#Short-Term Indicators (weighting)
#  * 3-day slope of PPO-Histogram (5%)
#  * 14-day RSI (5%)

def MACD = MACDHistogram();
def SHPPO = LinearRegressionSlope(MACD, length = 3);
def SHRSI = reference RSI();
def SH = (SHPPO + SHRSI) * SH_WEIGHT;

plot SCTR = Round(LT + MD + SH, NUMBEROFDIGITS = 1);

plot LONG_SR_HIGH = Round(Highest(SCTR, LENGTH = SR_LENGTH), NUMBEROFDIGITS = 1);

plot LONG_SR_LOW = Round(Lowest(SCTR, LENGTH = SR_LENGTH), NUMBEROFDIGITS = 1);

SCTR.SetDefaultColor(Color.GRAY);
SCTR.SetLineWeight(3);

LONG_SR_HIGH.SetDefaultColor(Color.GRAY);
LONG_SR_HIGH.SetStyle(Curve.SHORT_DASH);
LONG_SR_HIGH.SetLineWeight(1);

LONG_SR_LOW.SetDefaultColor(Color.GRAY);
LONG_SR_LOW.SetStyle(Curve.SHORT_DASH);
LONG_SR_LOW.SetLineWeight(1);

### $$$ ###
