# SWINGENTRY
# WGRIFFITH2 (C) 2014

input len1 = 252;
input len2 = 63;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

def GREENPRICE =
MACD >= 0 and
FASTLINE >= SLOWLINE;

def REDPRICE =
MACD < 0 and
FASTLINE < SLOWLINE;

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

plot BULLISH = !REDPRICE
and close > OHLC4[1]
AND RSI < 50
and (RSI[1] - rsi_low1[1] <= 2
and RSI[1] - rsi_low2[1] <= 2);

plot BEARISH = !GREENPRICE
and close < OHLC4[1]
AND RSI > 70
and (rsi_high1[1] - RSI[1] <= 2
and rsi_high2[1] - RSI[1] <= 2);

BULLISH.SetDefaultColor(CreateColor(0, 255, 0));
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEARISH.SetDefaultColor(CreateColor(255, 0, 0));
BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);