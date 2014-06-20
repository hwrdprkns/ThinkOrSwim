# SWINGTRADERLX
# WGRIFFITH2 (C) 2014

# ONLY USED ON LONG POSITIONS

input SRLEN = 40;
input STOPPRICE = LOW;
input KPERIOD = 14;
input DPERIOD = 3;
input STOPLOSSLEN = 5;

# STOCHASTICSLOW
DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

def TARGET = HIGH >= HIGHEST(HIGH[1], 30) 

# TRAILINGSTOP
def STOP = close <= Lowest(DATA = STOPPRICE, LENGTH = STOPLOSSLEN)[1];

# DEFINING ENTRY
plot ENTRY =
FASTLINE >= SLOWLINE
AND CLOSE >= HIGHEST(HIGH[1], 2)
AND LOWEST(FASTLINE, 3) <= 20;

plot EXIT = STOP OR TARGET;

#DEF SHARES = ROUND(10000 / CLOSE);
def SHARES = 100;

#LONG POSITION:
AddOrder(OrderType.BUY_TO_OPEN, ENTRY is true, tradeSize = SHARES, tickcolor = GetColor(0), arrowcolor = GetColor(0), name = "LE");
AddOrder(OrderType.SELL_TO_CLOSE, EXIT is true, tradeSize = SHARES, tickcolor = GetColor(1), arrowcolor = GetColor(1), name = "LX");

##################################################