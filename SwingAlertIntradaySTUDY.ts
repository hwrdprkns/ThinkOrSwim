# SwingAlertIntraday
# DREWGRIFFITH15 (C) 2014

declare upper;
input kperiod = 14;
input dperiod = 1;
input oversold = 20;
input rsi_length = 2;
input price = close;

# STOCHASTICSLOW
def FASTLINE = round(StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD),0);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

DEF BULLISH =
RSI[2] <= 5
and RSI[1] <= 5
and RSI > 5
and lowest(FASTLINE,3) <= oversold;

PLOT BUY = BULLISH;

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(if BULLISH == 1 THEN COLOR.GREEN ELSE IF BULLISH == .5 THEN COLOR.YELLOW ELSE Color.WHITE);
