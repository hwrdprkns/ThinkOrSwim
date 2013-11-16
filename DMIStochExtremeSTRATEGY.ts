# DMISTOCHASTICEXTREME
# WGRIFFITH2 (c) 2013

input length = 10;
input kperiod = 14;
input dperiod = 3;
input over_bought = 90;
input over_sold = 10;
input avgvol = 60;

def DMIStoch = DMI_StochasticExtreme(length, kperiod, dperiod, over_bought, over_sold);

def FASTLINE = Round(SimpleMovingAvg(100*((Close-Lowest(Low,kperiod))/(Highest(high,kperiod)-Lowest(Low,kperiod))), length = dperiod));

def entry = DMIStoch crosses above over_sold and fastline[1] < 20 and rsiWilder()[1] < 40 AND VOLUMEAVG(LENGTH = AVGVOL) > VOLUMEAVG(LENGTH = AVGVOL).VOLAVG;

DEF ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = 7)[1];
DEF STOPLOSS = (LOW <= ROLLINGLOW AND ENTRY IS FALSE);

def exit = dmiStoch crosses below over_bought or STOPLOSS is true;

DEF SHARES = ROUND(10000 / CLOSE);

ADDORDER(ORDERTYPE.BUY_TO_OPEN, ENTRY IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "LE");
ADDORDER(ORDERTYPE.SELL_TO_CLOSE, EXIT IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX", PRICE = OHLC4);