# SWINGENTRY
# WGRIFFITH2 (C) 2014

input len1 = 252;
input len2 = 42;

# RSI SR
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = 50 * (ChgRatio + 1);

def rsi_low1 = 
Round(Lowest(RSI, LENGTH = len1), numberOfDigits = 0);
def rsi_high1 = 
Round(Highest(RSI, LENGTH = len1), numberOfDigits = 0);

def rsi_low2 = 
Round(Lowest(RSI, LENGTH = len2), numberOfDigits = 0);
def rsi_high2 = 
Round(Highest(RSI, LENGTH = len2), numberOfDigits = 0);

plot UNCONFIRMEDBULL =
RSI <= 30
and (RSI - rsi_low1 <= 0);

plot CONFIRMEDBULL = CLOSE > OHLC4[1]
and RSI[1] <= 30
and (RSI[1] - rsi_low1[1] <= 0);

UNCONFIRMEDBULL.SetDefaultColor(CreateColor(128, 128, 128));
UNCONFIRMEDBULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
CONFIRMEDBULL.SetDefaultColor(CreateColor(0, 255, 0));
CONFIRMEDBULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);