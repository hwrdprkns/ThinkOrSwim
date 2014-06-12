# SWINGTREND
# WGRIFFITH2 (C) 2014

DEF PAINTBARS = YES;
INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT RSI_LEN = 14;
INPUT RSIMA_LEN = 12;

# STOCHASTICSLOW
DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

# RSI
DEF NETCHGAVG = WILDERSAVERAGE(CLOSE - CLOSE[1], RSI_LEN);
DEF TOTCHGAVG = WILDERSAVERAGE(ABSVALUE(CLOSE - CLOSE[1]), RSI_LEN);
DEF CHGRATIO = IF TOTCHGAVG != 0 THEN NETCHGAVG / TOTCHGAVG ELSE 0;
DEF RSI = ROUND(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);
DEF RSISMA = SIMPLEMOVINGAVG(PRICE = RSI, LENGTH = RSIMA_LEN);

# TEST
DEF GREENPRICE = FASTLINE >= SLOWLINE AND RSI >= RSISMA;
DEF REDPRICE = FASTLINE < SLOWLINE AND RSI < RSISMA;

PLOT BULLISH = GREENPRICE;
PLOT NEUTRAL = !GREENPRICE AND !REDPRICE;
PLOT BEARISH = REDPRICE;

BULLISH.SETDEFAULTCOLOR(COLOR.UPTICK);
BULLISH.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_POINTS);
BULLISH.SETLINEWEIGHT(3);
BULLISH.HIDE();
NEUTRAL.SETDEFAULTCOLOR(COLOR.GRAY);
NEUTRAL.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_POINTS);
NEUTRAL.SETLINEWEIGHT(3);
NEUTRAL.HIDE();
BEARISH.SETDEFAULTCOLOR(COLOR.DOWNTICK);
BEARISH.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_POINTS);
BEARISH.SETLINEWEIGHT(3);
BEARISH.HIDE();

DEFINEGLOBALCOLOR("BULLISH", COLOR.UPTICK);
DEFINEGLOBALCOLOR("NEUTRAL", COLOR.GRAY);
DEFINEGLOBALCOLOR("BEARISH", COLOR.DOWNTICK);
ASSIGNPRICECOLOR(IF !PAINTBARS THEN COLOR.CURRENT ELSE IF GREENPRICE THEN GLOBALCOLOR("BULLISH") ELSE IF REDPRICE THEN GLOBALCOLOR("BEARISH") ELSE GLOBALCOLOR("NEUTRAL"));