# SWINGRATING
# WGRIFFITH2 (C) 2014

declare lower;

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

# 12M
def rsi_low252 = 
round(LOWEST(RSI,LENGTH=len1), numberOfDigits = 0);
def rsi_high252 = 
round(HIGHEST(RSI,LENGTH=len1), numberOfDigits = 0);

# 3M
def rsi_low63 = 
round(LOWEST(RSI,LENGTH=len2), numberOfDigits = 0);
def rsi_high63 = 
round(HIGHEST(RSI,LENGTH=len2), numberOfDigits = 0);

plot RATING =

if !REDPRICE
and close > OHLC4[1]
AND RSI < 60
and (RSI[1] - rsi_low252[1] <= 2
and RSI[1] - rsi_low63[1] <= 2)
then 2

else if !REDPRICE
and close > OHLC4[1]
AND RSI < 60
and (RSI[1] - rsi_low252[1] <= 2
or RSI[1] - rsi_low63[1] <= 2)
then 1

else if !GREENPRICE
and close < OHLC4[1]
AND RSI > 70
and (rsi_high252[1] - RSI[1] <= 1
and rsi_high63[1] - RSI[1] <= 1)
then -2

else if !GREENPRICE
and close < OHLC4[1]
AND RSI > 70
and (rsi_high252[1] - RSI[1] <= 1
or rsi_high63[1] - RSI[1] <= 1)
then -1

else 0;