# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

input periods = 2;

declare upper;

# HEAVY VOLUME
def RelativeVolume = VolumeAvg(LENGTH = 60) / VolumeAvg(LENGTH = 60).VOLAVG;

# HIGHS / LOWS
def ROLLINGLOW = Lowest(DATA = low(), LENGTH = periods)[1];
def ROLLINGHIGH = Highest(DATA = high(), LENGTH = periods)[1];

# SMA TEST
def SMA200 = close > SimpleMovingAvg(LENGTH = 200);
def SMA20 = close > SimpleMovingAvg(LENGTH = 20);

plot RATING =

# BULL =
if
((SMA200 AND !SMA20)
OR (!SMA200 AND !SMA20))
AND RelativeVolume >= 1.0
and close >= ROLLINGHIGH
then 1

else if
((!SMA200 AND SMA20)
OR (SMA200 AND SMA20))
AND RelativeVolume >= 1.5
and close <= ROLLINGLOW
then -1

else 0;