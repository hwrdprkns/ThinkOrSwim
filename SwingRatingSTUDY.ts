# SWINGRATING
# WGRIFFITH2 (C) 2014

# DUE TO COMPLEXITY, GREEN/PRICE TREND INDICATORS HAVE BEEN REMOVED. CLOSE COMPARED TO OHLC4[1] WILL BE USED INSTEAD

declare lower;

input len1 = 252;
input len2 = 63;

# STOCHASTICSLOW
#def KPERIOD = 14;
#def DPERIOD = 3;
#def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
#def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));
#
## MACD
##def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = #35, "MACD LENGTH" = 5);
#
#def GREENPRICE =
#MACD >= 0 and
#FASTLINE >= SLOWLINE;
#
#def REDPRICE =
#MACD < 0 and
#FASTLINE < SLOWLINE;
#
## RSI SR
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

# CONFIRMED UP OFF BOTH LOWS
if #!REDPRICE and
close > OHLC4[1]
and RSI < 50
and (RSI[1] - rsi_low1[1] <= 2
and RSI[1] - rsi_low2[1] <= 2)
then 3

# CONFIRMED UP OFF ONE LOW
else if #!REDPRICE and
close > OHLC4[1]
and RSI < 50
and (RSI[1] - rsi_low1[1] <= 2
or RSI[1] - rsi_low2[1] <= 2)
then 2

# UNCONFIRMED OFF BOTH LOW
else if RSI < 50
and (RSI - rsi_low1 <= 1
and RSI - rsi_low2 <= 1)
then 1

# CONFIRMED DOWN OFF BOTH HIGHS
else if #!GREENPRICE and
close < OHLC4[1]
and RSI > 70
and (rsi_high1[1] - RSI[1] <= 2
and rsi_high2[1] - RSI[1] <= 2)
then -3

# CONFIMED DOWN OFF ONE HIGH
else if #!GREENPRICE and
close < OHLC4[1]
and RSI > 70
and (rsi_high1 - RSI <= 1
or rsi_high2 - RSI <= 1)
then -2

# UNCONFIRMED OFF BOTH HIGH
else if RSI > 70
and (rsi_high1 - RSI <= 1
and rsi_high2 - RSI <= 1)
then -1

else 0;