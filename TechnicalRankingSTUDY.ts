# TECHNICALRANKING
# WGRIFFITH2 (C) 2013

#MODELED AFTER THE TECHNICAL RANKING FROM STOCKCHARTS
#HTTP://STOCKCHARTS.COM/SCHOOL/DOKU.PHP?ID=CHART_SCHOOL:TECHNICAL_INDICATORS:SCTR

declare lower;

INPUT PRICE = CLOSE;

DEF EMA = MOVAVGEXPONENTIAL(LENGTH = 200, PRICE = PRICE);
DEF LTEMA = ((PRICE-EMA)/EMA);

DEF MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);
def MACD_max = highestAll(MACD)[200];
DEF invMACD = -((MACD-MACD_max)/MACD_max)*.1;

def rsi = rsiwilder();
def rsi_max = highestAll(rsi)[200];
DEF invRSI = -((rsi-rsi_max)/rsi_max)*.1;

DEF KPERIOD = 14;
DEF DPERIOD = 3;
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD));
def sto_max = highestAll(FASTLINE)[200];
def invSto = -((fastline-sto_max)/sto_max)*.1;

DEF CMF = chaikinMoneyFlow();
def CMF_max = highestAll(CMF)[200];
DEF invCMF = -((CMF-CMF_max)/CMF_max)*.1;

PLOT TOTAL = LTEMA+invRSI+invMACD+invSto+invCMF;

##########################################################
