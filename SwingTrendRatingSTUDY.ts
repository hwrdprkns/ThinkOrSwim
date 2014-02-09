# SWINGTRENDRATING
# WGRIFFITH2 (C) 2014

input price = close;
input length = 14;
input sma_length = 12;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# RSI
#def rsi = reference RSIWilder(price = price, length = length);
#def SMA = SimpleMovingAvg(price = rsi, length = sma_length);

# MACD
def MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);

def GreenPrice = MACD >= 0 and FASTLINE >= SLOWLINE;
def RedPrice = MACD < 0 and FASTLINE < SLOWLINE;

plot RATING =

if Bullish then 1

else if Bearish then -1

else 0;