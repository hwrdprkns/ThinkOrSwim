# SWINGENTRY
# WGRIFFITH2 (C) 2014

declare upper;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# RSI
def NETCHGAVG = WildersAverage(close - close[1], 14);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), 14);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

# OSCILLATOR TEST
def GREENPRICE = MACD >= 0 and FASTLINE >= SLOWLINE;
def REDPRICE = MACD < 0 and FASTLINE < SLOWLINE;

# HEAVY VOLUME
def HEAVY = VolumeAvg(LENGTH = 63) > VolumeAvg(LENGTH = 63).VOLAVG;

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot BULL =
!REDPRICE
and HEAVY
and RSI[1] < 50
and SMA200
and !SMA20
and close > OHLC4[1]
and close > close[1];

plot BEAR =
!GREENPRICE
and HEAVY
and RSI[1] > 50
and !SMA200
and SMA20
and close < OHLC4[1]
and close < close[1];

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);