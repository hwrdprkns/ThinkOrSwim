# SwingAlertDaily
# DREWGRIFFITH15 (C) 2014

declare upper;
input SLOWK = 14;
input SLOWD = 3;
input MACD_FAST = 5;
input MACD_SLOW = 25;
input MACD_LENGTH = 5;
input overbought = 80;
input oversold = 20;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("k period" = SLOWK, "d period" = SLOWD);
def SLOWLINE = StochasticSlow("k period" = SLOWK, "d period" = SLOWD).SlowD;

# MACD
def MACD = MACDHistogram("fast length" = MACD_FAST, "slow length" = MACD_SLOW, "macd length" = MACD_LENGTH);

def GreenPrice = MACD >= 0 and FASTLINE >= SLOWLINE;

plot BULLISH =
GreenPrice and lowest(FASTLINE,2)[1] <= oversold;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);
