# SWINGTRIGGER
# DREWGRIFFITH15 (C) 2014

declare upper;
input RSI_LENGTH = 14;
input RSI_SR = 20;
input SMA_LENGTH = 10;
input OVER_BOUGHT = 50;
input OVER_SOLD = 50;
input TRAIL = 2;
input DISPLACE = 1;
input AGGREGATIONPERIOD = AggregationPeriod.DAY;

# RSI
def NETCHGAVG = WildersAverage(close - close[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);
def RSI_HIGH = Round(Highest(RSI, LENGTH = RSI_SR), NUMBEROFDIGITS = 0);
def RSI_LOW = Round(Lowest(RSI, LENGTH = RSI_SR), NUMBEROFDIGITS = 0);
def RSI_SMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = SMA_LENGTH), NUMBEROFDIGITS = 0);
def RSI_SUPPORT = (RSI - RSI_LOW) <= 1;
def RSI_RESISTANCE = (RSI_HIGH - RSI) <= 1;

plot BULL =
RSI crosses above RSI_SMA and
RSI_LOW <= OVER_SOLD and
(RSI_SUPPORT[1] or RSI_SUPPORT[2] or RSI_SUPPORT[3]);

plot BEAR =
RSI crosses below RSI_SMA and
RSI_HIGH >= OVER_BOUGHT and
(RSI_RESISTANCE[1] or RSI_RESISTANCE[2] or RSI_RESISTANCE[3]);

plot RATING =
if BULL then Round(RSI - RSI[1], 0)
else if BEAR then Round(RSI - RSI[1], 0)
else 0;

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
RATING.Hide();
RATING.HideBubble();
