# SHORTEXITALERT
# WGRIFFITH2 (C) 2014

# This is an alert that stocks is moving outside of normal trading range. Does not necessarily mean that it is a hard exit on either side but it is a signal to monitor much more closely.

# Defaults are a 21 day RSI SR for a target, and a three day low/high for a stoploss. If the target is reached, then switch to a 180 day RSI SR, and a stoploss of a close below/above the previous day. Let profitable breakouts ride until there's a hint of it stalling out.

input SRLEN = 21;
input StopLossLEN = 3;
input StopPrice = high;

# RSI SUPPORT/RESISTANCE (SR)
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);
def rsi_low2 = round(LOWEST(RSI,LENGTH=SRLEN), numberOfDigits = 0);
def Target = RSI == rsi_low2;

# TRAILINGSTOP
def STOP = close > highest(DATA = StopPrice, LENGTH = StopLossLEN)[1];

plot EXIT = STOP or TARGET;
EXIT.SetDefaultColor(CreateColor(255, 0, 0));
EXIT.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);