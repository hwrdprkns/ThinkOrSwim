# InSyncLite

# This index is formed from signals on a set of different technical indicators, and used
# to determine extreme overbought/oversold values in the market.
#
# The InSyncLite is used detect extreme levels.
# Values higher or equal to 25 are considered to be high extreme levels. (short)
# Values lower or equal than -25 are considered to be low extreme levels. (long)
# The InSyncLite was built specifically for watchlists, scans, and alerts, because
# the full version is too complex to be handled during live trading in thinkorswim

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
def rsiW = if rsi > 95 then 10 else if rsi < 5 then -10 else 0;

# Point Sum
def sum = bb + sto + rsiW;

# Plots
plot inSync = ExpAverage(sum, smooth);
plot zero = if IsNaN(close) then Double.NaN else 0;
plot pos25 = if IsNaN(close) then Double.NaN else 25;
plot neg25 = if IsNaN(close) then Double.NaN else -25;
inSync.AssignValueColor(if sum > 0 then Color.RED else if sum < 0 then Color.GREEN else Color.Gray);
inSync.SetLineWeight(2);
zero.AssignValueColor(Color.LIGHT_GRAY);
pos25.AssignValueColor(Color.GREEN);
neg25.AssignValueColor(Color.RED);
zero.HideTitle();
pos25.HideTitle();
neg25.HideTitle();

# Needed for Watchlist box painting
#AssignBackgroundColor(if sum == 25 then Color.RED else if sum == -25 then Color.GREEN else Color.Gray);
