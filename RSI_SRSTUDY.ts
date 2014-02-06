# RSI_SR
# WGRIFFITH2 (C) 2014

declare lower;

input length = 14;
input over_Bought = 70;
input over_Sold = 30;
input price = close;

# RSI
def NetChgAvg = WildersAverage(price - price[1], length);
def TotChgAvg = WildersAverage(AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

# 12M
def rsi_low252 = 
round(LOWEST(RSI,LENGTH=252), numberOfDigits = 0);
def rsi_high252 = 
round(HIGHEST(RSI,LENGTH=252), numberOfDigits = 0);

# 3M
def rsi_low63 = 
round(LOWEST(RSI,LENGTH=63), numberOfDigits = 0);
def rsi_high63 = 
round(HIGHEST(RSI,LENGTH=63), numberOfDigits = 0);

plot rsi12mL = rsi_low252;
plot rsi3mL = rsi_low63;
plot rsi12mH = rsi_high252;
plot rsi3mH = rsi_high63;
plot rsi_plot = rsi;