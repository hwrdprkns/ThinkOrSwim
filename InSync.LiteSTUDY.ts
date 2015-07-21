# InSyncLite

# This index is formed from signals on a set of different technical indicators, and used
# to determine extreme overbought/oversold values in the market.
#
# The InSyncLite is used detect extreme levels.
# Values higher or equal to 20 are considered to be high extreme levels. (sell)
# Values lower or equal than -20 are considered to be low extreme levels. (buy)

# Designed for use on daily charts

declare lower;

# Data Smoothing Input
input smooth = 1;

# Study Definitions
def bbCalc = BollingerPercentB();
def rsi = reference RSI(length = 2);
def stoch = StochasticFull("k period" = 5);

# Indicator Scoring
def bb = if bbCalc > 95 then 5 else if bbCalc < 5 then -5 else 0;
def sto = if stoch > 80 then 10 else if stoch < 20 then -10 else 0;
def rsiW = if rsi > 95 then 5 else if rsi < 5 then -5 else 0;

# Point Sum
def sum = bb + sto + rsiW;

# Plots
plot inSync = ExpAverage(sum, smooth);
#plot zero = if IsNaN(close) then Double.NaN else 0;
#plot pos20 = if IsNaN(close) then Double.NaN else 20;
#plot neg20 = if IsNaN(close) then Double.NaN else -20;
inSync.AssignValueColor(if sum > 0 then Color.GREEN else if sum < 0 then Color.RED else Color.Gray);
inSync.SetLineWeight(2);
#zero.AssignValueColor(Color.LIGHT_GRAY);
#pos20.AssignValueColor(Color.RED);
#neg20.AssignValueColor(Color.GREEN);
#zero.HideTitle();
#pos20.HideTitle();
#neg20.HideTitle();

# Needed for Watchlist box painting
AssignBackgroundColor(if sum == 20 then Color.GREEN else if sum == -20 then Color.RED else Color.Gray);
