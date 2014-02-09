# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

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

plot RATING =

#GAPPINGBULL
if
open > high[1]
and close > close[1]
and (RSI[1] - rsi_low2[1] <= 1
or RSI[2] - rsi_low2[2] <= 1)
and rsi_high2 - RSI > 1
then 2

#CONFIRMEDBULL
else if
close > OHLC4[1]
and RSI[1] <= 30
and (RSI[1] - rsi_low1[1] <= 1)
then 1

# GAPPINGBEAR
else if
open < low[1]
and close < close[1]
and (rsi_high2[1] - RSI[1] <= 1
or rsi_high2[2] - RSI[2] <= 1)
and RSI - rsi_low1 > 1 then -2

# CONFIRMEDBEAR
else if
close < OHLC4[1]
and RSI[1] >= 70
and (rsi_high1[1] - RSI[1] <= 1) then -1

else 0;