# SWINGRATING
# WGRIFFITH2 (C) 2013

def PAINTBARS = yes;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

def GREENPRICE = 
MACD >= 0 and
FASTLINE >= SLOWLINE;
def REDPRICE =
MACD < 0 and
FASTLINE < SLOWLINE;

plot BULLISH =
# CONFIRMED MOVE GREEN
if GREENPRICE
and Lowest(FASTLINE, 5) < 20
and close > SimpleMovingAvg()
then 1
# TRENDING GREEN
else if GREENPRICE
and close > SimpleMovingAvg()
then .9
# UNCONFIRMED MOVE GREEN
ELSE if GREENPRICE
then .8
# CONFIRMED MOVE BLUE
else if !GREENPRICE
and !REDPRICE
and Lowest(FASTLINE, 5) < 20
and close > SimpleMovingAvg()
then .7
# TRENDING BLUE
else if !GREENPRICE
and !REDPRICE
and close > SimpleMovingAvg()
then .6
# UNCONFIRMED MOVE BLUE
ELSE if !GREENPRICE
and !REDPRICE
then .5
# UNCONFIRMED RED
ELSE if !GREENPRICE
and close > close[1]
and Lowest(FASTLINE, 5) < 20
then .15
else 0;

BULLISH.SetDefaultColor(CreateColor(0, 255, 0));
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);