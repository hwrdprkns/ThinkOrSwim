# SwingAlert
# DREWGRIFFITH15 (C) 2014

declare upper;
input KPERIOD = 14;
input DPERIOD = 1;
input MOVAVG = 3; # Change to 10 for intraday trading
input OVERBOUGHT = 80;
input OVERSOLD = 20;

# STOCHASTICSLOW
def FASTLINE = round(StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD),0);

# MOVING AVG
DEF MA = CLOSE > expAverage(CLOSE,MOVAVG);

# NEW HIGH /LOW
def NEW_HIGH = close > highest(high,2)[1];

DEF BULLISH =
NEW_HIGH
and MA
and lowest(fastline,2)[1] <= OVERSOLD;

PLOT BUY = BULLISH and !BULLISH[1];

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BUY.AssignValueColor(Color.GREEN);
