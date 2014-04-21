# SWINGTRADERLX
# WGRIFFITH2 (C) 2014

# ONLY USED ON LONG POSITIONS

input SRLEN = 21;
input StopLossLEN = 3;
input StopPrice = low;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# OSCILLATOR TEST
def GREENPRICE = MACD >= 0 and FASTLINE >= SLOWLINE;
def REDPRICE = MACD < 0 and FASTLINE < SLOWLINE;

# RSI SUPPORT/RESISTANCE (SR)
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);
def rsi_high2 = round(HIGHEST(RSI,LENGTH=SRLEN), numberOfDigits = 0);
def TARGET = RSI == rsi_high2;

def RSISMA = round(SimpleMovingAvg(price = RSI, length = 12),0);

# DEFINING ENTRY
DEF ENTRY = !Redprice
and close >= close[1]
and RSI <= 60
and RSI >= RSISMA
and lowest(FASTLINE[1],2) < 20;

# TRAILINGSTOP
def STOP = close < Lowest(DATA = StopPrice, LENGTH = StopLossLEN)[1];

plot EXIT = STOP or TARGET;

#DEF SHARES = ROUND(10000 / CLOSE);
DEF SHARES = 100;

#LONG POSITION:
ADDORDER(ORDERTYPE.BUY_TO_OPEN, ENTRY IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "LE");
ADDORDER(ORDERTYPE.SELL_TO_CLOSE, EXIT IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX", PRICE = ohlc4());

##################################################
