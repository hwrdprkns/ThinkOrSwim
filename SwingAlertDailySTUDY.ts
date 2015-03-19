# SwingAlertDaily
# DREWGRIFFITH15 (C) 2015

declare upper;
input KPeriod = 5;
input DPeriod = 3;
input mvoversold = 20;
input rsi_length = 5;
input rsi_oversold = 30;
input price = close;

# $$$ Wave
def FASTLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD);
def SLOWLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD).SlowD;

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = (lowest(FASTLINE,2) <= OVERSOLD) and FASTLINE crosses above SLOWLINE and lowest(RSI,2) <= rsi_oversold;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(Color.GREEN);
