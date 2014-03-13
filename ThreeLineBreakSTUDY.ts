# THREELINEBREAK
# WGRIFFITH2 (C) 2014

input RSILENGTH = 5;

# three line break
def L = close > highest(DATA = high, LENGTH = 2)[1];
def S = close < lowest(DATA = low, LENGTH = 2)[1];

# RSI
def NetChgAvg = WildersAverage(close - close[1], RSIlength);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), RSIlength);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

plot LENTRY = L AND lowest(RSI, 3) <= 25 
plot SENTRY = S AND highest(RSI, 3) >= 75 

LENTRY.SetDefaultColor(CreateColor(0, 255, 0));
LENTRY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

SENTRY.SetDefaultColor(CreateColor(255, 0, 0));
SENTRY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);