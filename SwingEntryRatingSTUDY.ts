# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

input len1 = 42;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);

def GreenPrice = MACD >= 0 and FASTLINE >= SLOWLINE;
def RedPrice = MACD < 0 and FASTLINE < SLOWLINE;

# RSI SR
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = Round(50 * (ChgRatio + 1), numberOfDigits = 0);

# Find RSI support/resistance lines
def rsi_low1 = 
Round(Lowest(RSI, LENGTH = len1), numberOfDigits = 0);
def rsi_high1 = 
Round(Highest(RSI, LENGTH = len1), numberOfDigits = 0);

plot RATING =

#GAPPINGBULL
if
!RedPrice
and open > high[1]
and close > high[1]
and RSI < 60
and rsi_high1 - RSI > 5
then 2

#CONFIRMEDBULL
else if 
!RedPrice
and close > close[1]
and close > open[1]
and RSI[1] - rsi_low1[1] <= 1
then 1

#GAPPINGBEAR
else if
!GreenPrice
and open < low[1]
and close < low[1]
and RSI > 40
and RSI - rsi_low1 > 5
then -2

#CONFIRMEDBEAR
else if
!GreenPrice
and close < close[1]
and close < open[1]
and rsi_high1[1] - RSI[1] <= 1
then -1

else 0;