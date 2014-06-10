# SWINGENTRY
# WGRIFFITH2 (C) 2014

declare upper;

input KPERIOD = 40;
input DPERIOD = 3;
input RSI_SMA = 10;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
def SLOWLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

#RSI
def NETCHGAVG = WildersAverage(close - close[1], 14);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), 14);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;

def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

def SMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = RSI_SMA), 0);

# TEST
def GREENPRICE = FASTLINE >= SLOWLINE and RSI >= SMA;
def REDPRICE = FASTLINE < SLOWLINE and RSI <= SMA;

plot BULL =
GREENPRICE
and close >= OHLC4[1]
and Lowest(FASTLINE[1], 2) <= 20;

plot BEAR =
REDPRICE
and close <= low[1]
and Highest(FASTLINE[1], 2) >= 80;

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);