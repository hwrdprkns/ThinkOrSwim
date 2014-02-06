# SWINGENTRY
# WGRIFFITH2 (C) 2014

input len1 = 252;
input len2 = 63;

# RSI SR
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = 50 * (ChgRatio + 1);

def rsi_low1 = 
round(LOWEST(RSI,LENGTH=len1), numberOfDigits = 0);
def rsi_high1 = 
round(HIGHEST(RSI,LENGTH=len1), numberOfDigits = 0);

def rsi_low2 = 
round(LOWEST(RSI,LENGTH=len2), numberOfDigits = 0);
def rsi_high2 = 
round(HIGHEST(RSI,LENGTH=len2), numberOfDigits = 0);

plot CONFIRMEDBULLTWO = close > OHLC4[1]
AND RSI[1] < 50
and (RSI[1] - rsi_low1[1] <= 2
and RSI[1] - rsi_low2[1] <= 2);

plot CONFIRMEDBULLONE = close > OHLC4[1]
AND RSI[1] < 50
and (RSI[1] - rsi_low1[1] <= 2
OR RSI[1] - rsi_low2[1] <= 2);

plot UNCONFIRMEDBULL = (RSI < 50
and (RSI - rsi_low1 <= 1
and RSI - rsi_low2 <= 1));

plot CONFIRMEDBEARTWO = close < OHLC4[1]
AND RSI[1] > 70
and (rsi_high1[1] - RSI[1] <= 2
and rsi_high2[1] - RSI[1] <= 2);

plot CONFIRMEDBEARONE = close < OHLC4[1]
AND RSI[1] > 70
and (rsi_high1[1] - RSI[1] <= 2
OR rsi_high2[1] - RSI[1] <= 2);

plot UNCONFIRMEDBEAR = (RSI > 70
and (rsi_high1 - RSI <= 1
and rsi_high2 - RSI <= 1));

CONFIRMEDBULLTWO.SetDefaultColor(CreateColor(0, 255, 0));
CONFIRMEDBULLTWO.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
CONFIRMEDBEARTWO.SetDefaultColor(CreateColor(255, 0, 0));
CONFIRMEDBEARTWO.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
CONFIRMEDBULLONE.SetDefaultColor(CreateColor(128, 128, 128));
CONFIRMEDBULLONE.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
CONFIRMEDBEARONE.SetDefaultColor(CreateColor(128, 128, 128));
CONFIRMEDBEARONE.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
UNCONFIRMEDBULL.SetDefaultColor(CreateColor(255, 0, 0));
UNCONFIRMEDBULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
UNCONFIRMEDBEAR.SetDefaultColor(CreateColor(0, 255, 0));
UNCONFIRMEDBEAR.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);