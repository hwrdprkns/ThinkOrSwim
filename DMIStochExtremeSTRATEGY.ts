##############DMI_STOCHASTIC EXTREME#############
# WGRIFFITH2
input length = 10;
input highlowlength = 7;
input sumlength = 3;
input over_bought = 90;
input over_sold = 10;

def DMIStoch = DMI_StochasticExtreme(length, highlowlength, sumlength, over_bought, over_sold);
#LONG POSITION:
addOrder(OrderType.BUY_TO_OPEN, DMIStoch crosses above over_sold, tickColor = GetColor(0), arrowColor = GetColor(0), name = "DMIStochLE");
addOrder(OrderType.SELL_TO_CLOSE, DMIStoch crosses above over_bought, tickColor = GetColor(1), arrowColor = GetColor(1), name = "DMIStochLX");
#SHORT POSTION:
#addOrder(OrderType.SELL_TO_OPEN, DMIStoch crosses below over_bought, tickColor = GetColor(1), arrowColor = GetColor(1), name = "DMIStochSE");
#addOrder(OrderType.BUY_TO_CLOSE, DMIStoch crosses below over_sold, tickColor = GetColor(0), arrowColor = GetColor(0), name = "DMIStochSX");
#######################END#######################