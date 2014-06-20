# SWINGTRADERLX
# WGRIFFITH2 (C) 2014

# ONLY USED ON LONG POSITIONS

input SRLEN = 40;
input STOPPRICE = LOW;
input KPERIOD = 14;
input DPERIOD = 3;
input RSI_LEN = 14;
input RSIMA_LEN = 12;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
def SLOWLINE = StochasticSlow("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

# RSI
def NETCHGAVG = WildersAverage(close - close[1], RSI_LEN);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), RSI_LEN);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 1);
def RSISMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = RSIMA_LEN), 1);

# TEST
def GREENPRICE = FASTLINE >= SLOWLINE and RSI >= RSISMA;
def REDPRICE = FASTLINE < SLOWLINE and RSI < RSISMA;

# RSI SUPPORT/RESISTANCE (SR)
def RSI_HIGH = Round(Highest(RSI, LENGTH = SRLEN), NUMBEROFDIGITS = 0);
def TARGET = RSI == RSI_HIGH;
DEF STOP = RSI < RSISMA;

# DEFINING ENTRY
plot ENTRY =
GREENPRICE
AND RSI[1] < RSISMA[1]
AND RSISMA <= 50
AND RSISMA >= 30;

plot EXIT = STOP OR TARGET;

#DEF SHARES = ROUND(10000 / CLOSE);
def SHARES = 100;

#LONG POSITION:
AddOrder(OrderType.BUY_TO_OPEN, ENTRY is true, tradeSize = SHARES, tickcolor = GetColor(0), arrowcolor = GetColor(0), name = "LE");
AddOrder(OrderType.SELL_TO_CLOSE, EXIT is true, tradeSize = SHARES, tickcolor = GetColor(1), arrowcolor = GetColor(1), name = "LX");

##################################################