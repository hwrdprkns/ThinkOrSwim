#############DARVAS BOX BREAKOUT############
# WGRIFFITH2 (C) 2013

input periods = 2;
input offsetType = {default percent, value, tick};

def entryPrice = entryPrice();
def cl = CLOSE;
def stop = lowest(data = LOW, length = periods)[1];
def hi = highest(data = CLOSE, length = periods)[1];
def shares = round(10000 / CLOSE);
def targetPrice = entryPrice + atrWilder()*2;

#LONG POSITION:
addorder(ordertype.buy_to_open, cl crosses above hi and volumeavg(length = 50) > volumeavg(length = 50).volavg, tradesize = shares, tickcolor = getcolor(0), arrowcolor = getcolor(0), name = "DarvasLE", price = open[-1]);
addorder(OrderType.SELL_TO_CLOSE, (cl crosses above targetPrice) or (cl crosses below stop), tradesize = shares, tickcolor = getcolor(1), arrowcolor = getcolor(1), name = "DarvasLX", price = OPEN[-1]);

##################################################