# SwingAlertDaily
# DREWGRIFFITH15 (C) 2015

declare upper;
input KPeriod = 5;
input DPeriod = 3;
input OVERSOLD = 20;
input price = close;

# $$$ Wave
def FASTLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD);
def SLOWLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD).SlowD;

plot BULLISH = if
(lowest(FASTLINE,2) <= OVERSOLD) and FASTLINE crosses above SLOWLINE then 1 # MoneyWave crossover
else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(if BULLISH == 1 then Color.BLUE else Color.White);