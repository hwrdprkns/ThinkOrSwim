#############DARVAS BOX BREAKOUT############
# WGRIFFITH2 (C) 2013

input len = 10;

def cl = close;
def stop = lowest(data = low)[1];
def hi = highest(data = high, length = len)[1];
def shares = round(10000 / close);

#LONG POSITION:
addorder(ordertype.buy_to_open, cl crosses above hi and volumeavg(length = len) > volumeavg(length = len).volavg, tradesize = shares, tickcolor = getcolor(0), arrowcolor = getcolor(0), name = "DarvasLE");
addorder(ordertype.sell_to_close, cl crosses below stop, tradesize = shares, tickcolor = getcolor(1), arrowcolor = getcolor(1), name = "DarvasLX");

##################################################