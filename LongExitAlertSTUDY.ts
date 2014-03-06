# LONGEXITALERT
# WGRIFFITH2 (C) 2014

# This is an alert that stocks is moving outside of normal trading range. Does not necessarily mean that it is a hard exit on either side but it is a signal to monitor much more closely.

input RSIlength = 5;
input StopLossLEN = 3;
input StopPrice = low;

# RSI SUPPORT/RESISTANCE (SR)
def NetChgAvg = WildersAverage(close - close[1], RSIlength);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), RSIlength);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

def Target = RSI >= 75;

# TRAILINGSTOP
def STOP = close < Lowest(DATA = StopPrice, LENGTH = StopLossLEN)[1];

plot EXIT = STOP or TARGET;
EXIT.SetDefaultColor(CreateColor(255, 0, 0));
EXIT.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);