# TECHNICALRANKING
# WGRIFFITH2 (C) 2013

#MODELED AFTER THE TECHNICAL RANKING FROM STOCKCHARTS
#HTTP://STOCKCHARTS.COM/SCHOOL/DOKU.PHP?ID=CHART_SCHOOL:TECHNICAL_INDICATORS:SCTR

declare lower;

INPUT PRICE = CLOSE;
INPUT LONG_TERM = 5;
INPUT MED_TERM = 20;
INPUT SHORT_TERM = 25;

DEF EMA = MOVAVGEXPONENTIAL(LENGTH = 200, PRICE = PRICE);
DEF LTEMA = if ((PRICE-EMA)/EMA)*2 > 1 then 1 else ((PRICE-EMA)/EMA)*LONG_TERM;

def rsi = rsiwilder();
def rsi_max = highestAll(rsi)[200];
DEF invRSI = -((rsi-rsi_max)/rsi_max)*MED_TERM;

DEF MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);
def slopeMACD = linearRegressionSlope(MACD, length = 3)*SHORT_TERM;

plot TOTAL = slopeMACD+invRSI+LTEMA;
##########################################################
