# RSI_SR
# WGRIFFITH2 (C) 2014

declare lower;

input len1 = 252;
input len2 = 42;

# RSI
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

def rsi_low1 = 
round(LOWEST(RSI,LENGTH=len1), numberOfDigits = 0);
def rsi_high1 = 
round(HIGHEST(RSI,LENGTH=len1), numberOfDigits = 0);

def rsi_low2 = 
round(LOWEST(RSI,LENGTH=len2), numberOfDigits = 0);
def rsi_high2 = 
round(HIGHEST(RSI,LENGTH=len2), numberOfDigits = 0);

plot rsi1mL = rsi_low1;
plot rsi2mL = rsi_low2;
plot rsi1mH = rsi_high1;
plot rsi2mH = rsi_high2;
plot rsi_plot = rsi;