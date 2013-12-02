# RSITrend
# WGRIFFITH2 (c) 2013

input paintBars = yes;
input length = 14;
input sma_length = 12;
input over_bought = 70;
input over_sold = 30;
input price = close;
input rsiChoice = {default "RSI Wilder", "RSI EMA"};

def rsi;
switch (rsiChoice) {
case "RSI EMA":
    rsi = reference RSI_EMA(price = price, length = length);
case "RSI Wilder":
    rsi = reference RSIWilder(price = price, length = length);
}

def SMA = SimpleMovingAvg(price = rsi, length = sma_length);

def GreenPrice = RSI > SMA;
def RedPrice = RSI < SMA;

plot Bullish = GreenPrice;
plot Neutral = !GreenPrice and !RedPrice;
plot Bearish = RedPrice;

Bullish.SetDefaultColor(Color.UPTICK);
Bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bullish.SetLineWeight(3);
Bullish.hide();
Neutral.SetDefaultColor(Color.BLUE);
Neutral.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Neutral.SetLineWeight(3);
Neutral.hide();
Bearish.SetDefaultColor(Color.DOWNTICK);
Bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
Bearish.SetLineWeight(3);
Bearish.hide();

DefineGlobalColor("Bullish", Color.UPTICK);
DefineGlobalColor("Neutral", Color.BLUE);
DefineGlobalColor("Bearish", Color.DOWNTICK);
AssignPriceColor(if !paintBars then Color.CURRENT else if GreenPrice then globalColor("Bullish") else if RedPrice then globalColor("Bearish") else globalColor("Neutral"));

#############################################################