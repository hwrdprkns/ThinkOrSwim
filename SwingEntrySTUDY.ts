# SWINGENTRY
# WGRIFFITH2 (C) 2014

declare upper;
# RSI
def NETCHGAVG = WildersAverage(close - close[1], 14);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), 14);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot BULL =
((SMA200 and !SMA20 and RSI[1] <= 50
and RelativeVolume >= 1.0) # TL SUPPORT
or (!SMA200 and !SMA20 and RSI[1] <= 50
and RelativeVolume >= 1.25)) # OVERSOLD
and close > OHLC4[1]
and close > close[1];

plot BEAR =
((!SMA200 and SMA20 and RSI[1] >= 50
and RelativeVolume >= 1.25) # TL SUPPORT
or (SMA200 and SMA20 and RSI[1] >= 50
and RelativeVolume >= 1.5)) # OVERBOUGHT
and close < OHLC4[1]
and close < close[1];

BULL.SetDefaultColor(CreateColor(0, 255, 0));
BULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEAR.SetDefaultColor(CreateColor(255, 0, 0));
BEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);