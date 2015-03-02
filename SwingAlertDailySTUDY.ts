# SwingAlertDaily
# DREWGRIFFITH15 (C) 2015

declare upper;
input KPeriod = 5;
input DPeriod = 3;
input RSI_LENGTH = 2;
input OVERSOLD = 20;
input price = close;

# $$$ Wave
def FASTLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD);
def SLOWLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD).SlowD;

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = if
(lowest(FASTLINE,2) <= OVERSOLD) and FASTLINE crosses above SLOWLINE then 1 # MoneyWave crossover
else if (lowest(FASTLINE,2) <= OVERSOLD) and RSI[1] <= 5 and RSI <= 5 then .5 # Extremely oversold
else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(if BULLISH == 1 THEN COLOR.GREEN ELSE IF BULLISH == .5 THEN COLOR.YELLOW ELSE Color.WHITE);
