#
# TD Ameritrade IP Company, Inc. (c) 2013
#

input price = close;
input sma_length = 12;
input length = 14;
input over_bought = 70;
input over_sold = 30;
input rsiChoice = {default "RSI Wilder", "RSI EMA"};

def rsi;
switch (rsiChoice) {
case "RSI EMA":
    rsi = reference RSI_EMA(price = price, length = length);
case "RSI Wilder":
    rsi = reference RSIWilder(price = price, length = length);
}

def SMA = SimpleMovingAvg(price = rsi, length = sma_length);

def entry = RSI > SMA and SMA < 50;

def exit = rsi > over_bought or rsi < sma;

DEF SHARES = ROUND(10000 / PRICE);

ADDORDER(ORDERTYPE.BUY_TO_OPEN, ENTRY IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "LE");
ADDORDER(OrderType.SELL_TO_CLOSE, exit IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX", PRICE = CLOSE()[0]);
