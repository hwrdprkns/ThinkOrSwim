#############SWING BOX BREAKOUT############
# WGRIFFITH2 (C) 2013

input side = "LONG";
input factor = 2;
input periods = 3;

def entryPrice = entryPrice();
def RollingLow = Lowest(data = LOW(), length = periods)[1];
def Stop = (Low <= RollingLow);
def Breakout = (CLOSE > HIGHEST(DATA = CLOSE, LENGTH = 2)[1]) AND VOLUMEAVG(LENGTH = 50) > VOLUMEAVG(LENGTH = 50).VOLAVG;
def shares = round(10000 / CLOSE);

#LONG POSITION:
addorder(ordertype.buy_to_open, Breakout is TRUE, tradesize = shares, tickcolor = getcolor(0), arrowcolor = getcolor(0), name = "LE", price = open[-1]);
addorder(OrderType.SELL_TO_CLOSE, Stop is TRUE, tradesize = shares, tickcolor = getcolor(1), arrowcolor = getcolor(1), name = "LX", price = RollingLow);

##################################################