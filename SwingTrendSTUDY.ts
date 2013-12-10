# SwingTrend
# WGRIFFITH2 (c) 2013

input price = close;
input length = 14;
input sma_length = 12;
input paintBars = yes;

# STOCHASTICSLOW
DEF KPERIOD = 14;
DEF DPERIOD = 3;
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD));
DEF SLOWLINE = ROUND(SIMPLEMOVINGAVG(SIMPLEMOVINGAVG(100*((CLOSE-LOWEST(LOW,KPERIOD))/(HIGHEST(HIGH,KPERIOD)-LOWEST(LOW,KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# RSI
def rsi = reference RSIWilder(price = price, length = length);
def SMA = SimpleMovingAvg(price = rsi, length = sma_length);

# MACD
DEF MACD = MACDHistogram("fast length" = 5, "slow length" = 35, "macd length" = 5);

def GreenPrice = RSI > SMA AND MACD > 0 and FASTLINE > SLOWLINE;
def RedPrice = RSI < SMA AND MACD < 0 and FASTLINE < SLOWLINE;

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