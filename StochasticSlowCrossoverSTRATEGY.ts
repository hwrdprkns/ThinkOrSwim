#############STOCHASTIC SLOW CROSSOVER############
# WGRIFFITH2 (c) 2013

input kperiod = 14;
input dperiod = 3;
input over_bought = 80;
input over_sold = 20;

def FASTLINE = Round(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod), length = dperiod));

#LONG POSITION:
addOrder(OrderType.BUY_TO_OPEN, FASTLINE crosses above SLOWLINE and FASTLINE <50, tickColor = GetColor(0), arrowColor = GetColor(0), name = "StochLE");
addOrder(OrderType.SELL_TO_CLOSE, FASTLINE crosses below SLOWLINE, tickColor = GetColor(1), arrowColor = GetColor(1), name = "StochLX");

#SHORT POSTION:
#addOrder(OrderType.SELL_TO_OPEN, FASTLINE crosses below over_bought and FASTLINE >50, tickColor = GetColor(1), arrowColor = GetColor(1), name = "StochSE");
#addOrder(OrderType.BUY_TO_CLOSE, FASTLINE crosses below over_sold, tickColor = GetColor(0), arrowColor = GetColor(0), name = "StochSX");
##################################################