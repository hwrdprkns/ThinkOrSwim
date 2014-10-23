# SwingAlert
# DREWGRIFFITH15 (C) 2014

declare upper;
input SHORT_KPERIOD = 5;
input LONG_KPERIOD = 15;
input DPERIOD = 1;
input SMA_LENGTH = 3;
input OVERBOUGHT = 80;
input OVERSOLD = 20;

# STOCHASTICSLOW SHORT
def SHORT_FASTLINE = StochasticSlow("k period" = SHORT_KPERIOD, "d period" = DPERIOD);
def LONG_FASTLINE = StochasticSlow("k period" = LONG_KPERIOD, "d period" = DPERIOD);

# NEW HIGH /LOW
def NEW_HIGH = close > high[1];
def NEW_LOW = close < low[1];

def SMA = simplemovingavg(close,SMA_LENGTH);

PLOT BULLISH =
SHORT_FASTLINE crosses above OVERSOLD
AND LONG_FASTLINE[1] < OVERSOLD
AND CLOSE > SMA;

PLOT BEARISH =
SHORT_FASTLINE crosses below OVERBOUGHT
AND LONG_FASTLINE[1] > OVERBOUGHT
AND CLOSE < SMA;

plot RATING =
if BULLISH and NEW_HIGH then 1
else if BULLISH then .75
else if BEARISH and NEW_LOW then .5
else if BEARISH then .25
else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(IF RATING == 1 THEN COLOR.Green ELSE COLOR.GRAY);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.ASSIGNVALUECOLOR(IF RATING == .5 THEN COLOR.Red ELSE COLOR.GRAY);

RATING.Hide();
RATING.HideBubble();
