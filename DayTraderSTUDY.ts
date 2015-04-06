# DayTrader
# DREWGRIFFITH15 (C) 2015

declare upper;

# Inputs based on 15 minute chart

input price = close;
input rsi_length = 2;
input rsi_ob = 99;
input rsi_os = 5;
input kperiod = 5;
input BB_Length = 25;
input BB_Upper = 2.0;
input BB_Lower = -2.0;

# BollingerBands to confirm COG
def percentB = BollingerPercentB(length = BB_Length, "num dev dn" = BB_Lower, "num dev up" = BB_Upper, "average type" = "EXPONENTIAL");

def MoneyWave = StochasticFull("k period" = 5);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = MoneyWave <= 20 and RSI <= RSI_os and percentB <= 0 and price < hl2 and price < price[1];

plot BEARISH = MoneyWave >= 80 and RSI >= RSI_ob and percentB >= 100 and price > hl2 and price > price[1];

plot RATING = if BULLISH then 1 else if BEARISH then .5 else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.AssignValueColor(Color.RED);

RATING.Hide();

alert((RATING == 1), "CenterofGravity CALL", "alert type" = Alert.BAR, sound = Sound.Ding);
alert((RATING == .5), "CenterofGravity PUT", "alert type" = Alert.BAR, sound = Sound.Ding);
