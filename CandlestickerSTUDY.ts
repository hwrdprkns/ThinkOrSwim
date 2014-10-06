# CANDLESTICKER
# DREWGRIFFITH15 (C) 2014

declare upper;

plot BULLISH =
Lowest(low, 20) == Lowest(low, 2)

# Long Lower Shadow
and (close - low >= BodyHeight() * 3 and close > OHLC4
or Marubozu().BULLISH
or Engulfing().BULLISH
or PiercingLine());


plot BEARISH =
Highest(high, 20) == Highest(high, 2)

# Long Upper Shadow
and high - close >= BodyHeight() * 3 and close < OHLC4
or Marubozu().BEARISH
or Engulfing().BEARISH
or DarkCloudCover();


plot RATING =
if BULLISH then 1
else if BEARISH then .5
else 0;

BULLISH.SetDefaultColor(CreateColor(128, 128, 128));
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BEARISH.SetDefaultColor(CreateColor(128, 128, 128));
BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
RATING.Hide();
RATING.HideBubble();
#########################################
