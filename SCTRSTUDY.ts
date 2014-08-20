# SCTR
# DREWGRIFFITH15 (C) 2014

DECLARE LOWER;

INPUT SMA200 = 200;
INPUT ROC125 = 125;
INPUT SMA50 = 50;
INPUT ROC20 = 20;
INPUT PPO_HIST = 3;
INPUT RSI = 14;
INPUT LT_WEIGHT = .30;
INPUT MD_WEIGHT = .15;
INPUT SH_WEIGHT = .05;

# THIS STUDY IS A REPLICATION OF STOCKCHARTS TECHNICAL RANKING
# http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:sctr

#Long-Term Indicators (weighting)
#  * Percent above/below 200-day SMA (30%)
#  * 125-Day Rate-of-Change (30%)

def SM200 = simplemovingavg(close,SMA200);
def LTSMA = ((Close-SM200)/((Close+SM200)/2));
def LTROC = if close[ROC125] > 0 then (close / close[ROC125] - 1) * 100 else 0;
def LT = (LTSMA + LTROC) * LT_WEIGHT;

#Medium-Term Indicators (weighting)
#  * Percent above/below 50-day SMA  (15%)
#  * 20-day Rate-of-Change (15%)

def SM50 = simplemovingavg(close,SMA50);
def MDSMA = ((Close-SM50)/((Close+SM50)/2));
def MDROC = if close[ROC20] > 0 then (close / close[ROC20] - 1) * 100 else 0;
def MD = (MDSMA + MDROC) * MD_WEIGHT;

#Short-Term Indicators (weighting)
#  * 3-day slope of PPO-Histogram (5%)
#  * 14-day RSI (5%)

def MACD = macDHistogram();
def SHPPO = LinearRegressionSlope(MACD, length = 3);
def SHRSI = RSIWilder();
def SH = (SHPPO + SHRSI) * SH_WEIGHT;

plot SCTR = LT + MD + SH;
SCTR.SETDEFAULTCOLOR(COLOR.GRAY);
SCTR.SETLINEWEIGHT(3);

### $$$ ###
