# SHORTEXITALERT
# WGRIFFITH2 (C) 2014

# This is an alert that stocks is moving outside of normal trading range. Does not necessarily mean that it is a hard exit on either side but it is a signal to monitor much more closely.

input SRLEN = 21;
input StopLossLEN = 3;

# RSI RESISTANCE
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);
def rsi_low2 = round(LOWEST(RSI,LENGTH=SRLEN), numberOfDigits = 0);
def Target = RSI == rsi_low2;

# TRAILINGSTOP
def STOP = close > highest(DATA = high(), LENGTH = StopLossLEN)[1];

plot EXIT = STOP or TARGET;
EXIT.SetDefaultColor(CreateColor(255, 0, 0));
EXIT.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);