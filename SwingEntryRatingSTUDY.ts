# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

input KPERIOD = 40;
input DPERIOD = 3;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
def SLOWLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

def SMA = SimpleMovingAvg(length = 200);

# TEST
def GREENPRICE = FASTLINE >= SLOWLINE and close >= SMA;
def REDPRICE = FASTLINE < SLOWLINE and close <= SMA;

plot RATING =

if
GREENPRICE
and close >= OHLC4[1]
and FASTLINE <= 50
then 1

else if
REDPRICE
and close <= low[1]
and FASTLINE >= 50
then -1

else 0;