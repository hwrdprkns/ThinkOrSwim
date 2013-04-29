#############DARVAS BOX BREAKOUT############
# WGRIFFITH2 (C) 2013

input len = 10;

def cl = CLOSE;
def stop = lowest(data = LOW, length = len)[1];
def hi = highest(data = HIGH, length = len)[1];
def shares = round(10000 / CLOSE);

#LONG POSITION:
addorder(ordertype.buy_to_open, cl crosses above hi and volumeavg(length = len) > volumeavg(length = len).volavg, tradesize = shares, tickcolor = getcolor(0), arrowcolor = getcolor(0), name = "DarvasLE");
addorder(OrderType.SELL_TO_CLOSE, cl crosses below stop, tradesize = shares, tickcolor = getcolor(1), arrowcolor = getcolor(1), name = "DarvasLX", price = OHLC4);

##################################################