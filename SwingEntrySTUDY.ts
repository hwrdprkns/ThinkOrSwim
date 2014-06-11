# SWINGENTRY
# WGRIFFITH2 (C) 2014

declare upper;

input KPERIOD = 40;
input DPERIOD = 3;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
def SLOWLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

def SMA = SimpleMovingAvg(length = 200);

# TEST
def GREENPRICE = FASTLINE >= SLOWLINE and close >= SMA;
def REDPRICE = FASTLINE < SLOWLINE and close <= SMA;

plot BULL =
GREENPRICE
and close >= OHLC4[1]
and FASTLINE <= 50;

plot BEAR =
REDPRICE
and close <= low[1]
and FASTLINE >= 50;

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);