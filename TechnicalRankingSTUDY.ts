# TECHNICALRANKING
# WGRIFFITH2 (C) 2013

#MODELED AFTER THE TECHNICAL RANKING FROM STOCKCHARTS
#HTTP://STOCKCHARTS.COM/SCHOOL/DOKU.PHP?ID=CHART_SCHOOL:TECHNICAL_INDICATORS:SCTR

declare lower;

INPUT PRICE = CLOSE;

DEF EMA = MOVAVGEXPONENTIAL(LENGTH = 200, PRICE = PRICE);
DEF LTEMA = if ((PRICE-EMA)/EMA)*2 > 1 then 1 else ((PRICE-EMA)/EMA)*2;

DEF MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);
def slopeMACD = linearRegressionSlope(MACD, length = 3);

def rsi = rsiwilder();
def rsi_max = highestAll(rsi)[200];
DEF invRSI = -((rsi-rsi_max)/rsi_max);

#PLOT TOTAL = LTEMA+invRSI+invMACD+invSto;
plot TOTAL = slopeMACD+invRSI+LTEMA;
##########################################################
