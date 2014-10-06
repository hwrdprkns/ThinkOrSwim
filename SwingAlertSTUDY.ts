# SwingAlert
# DREWGRIFFITH15 (C) 2014

declare upper;
input KPERIOD = 14;
input DPERIOD = 3;
input MACD_FAST = 3;
input MACD_SLOW = 35;
input MACD_LENGTH = 3;
input RSI_LENGTH = 14;
input RSI_SMA = 9;

# STOCHASTICSLOW
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("fast length" = MACD_FAST, "slow length" = MACD_SLOW, "macd length" = MACD_LENGTH);

# RSI
def NETCHGAVG = WildersAverage(close - close[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), 0);
def RSISMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = RSI_SMA), 0);

# NEW HIGH /LOW
def NEW_HIGH = close > high[1];
def NEW_LOW = close < low[1];

# VOLUME
def VOL_AVG = VolumeAvg().VolAvg;
def VOL = volume;

PLOT BULLISH =
FASTLINE >= SLOWLINE
AND MACD >= 0
AND RSI >= RSISMA
AND NEW_HIGH AND !NEW_HIGH[1]
AND FASTLINE <= 50;

PLOT BEARISH =
FASTLINE <= SLOWLINE
AND MACD <= 0
AND RSI <= RSISMA
AND NEW_LOW AND !NEW_LOW[1]
AND FASTLINE >= 50;

plot RATING =
if BULLISH and VOL > VOL_AVG then 1
else if BULLISH then .75
else if BEARISH and VOL > VOL_AVG then .5
else if BEARISH then .25
else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(IF RATING == 1 THEN COLOR.Green ELSE COLOR.GRAY);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.ASSIGNVALUECOLOR(IF RATING == .5 THEN COLOR.Red ELSE COLOR.GRAY);

RATING.Hide();
RATING.HideBubble();
