# SHORTEXITALERT
# WGRIFFITH2 (C) 2014

# This is an alert that stocks is moving outside of normal trading range. Does not necessarily mean that it is a hard exit on either side but it is a signal to monitor much more closely.

input RSIlength = 5;
input StopLossLEN = 2;
input StopPrice = high;

# RSI
def NetChgAvg = WildersAverage(close - close[1], RSIlength);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), RSIlength);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

def Target = RSI <= 25;

# TRAILINGSTOP
def STOP = close > highest(DATA = StopPrice, LENGTH = StopLossLEN)[1];

plot EXIT = STOP or TARGET;
EXIT.SetDefaultColor(CreateColor(255, 0, 0));
EXIT.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);