# SwingTrader
# DREWGRIFFITH15 (C) 2015

declare upper;

# Daily settings; Not recommended for intraday trading because COG "repaints"

input price = close;
input COGlength = 10;
input ExtremeValue = 2.6;
input rsi_length = 2;
input rsi_ob = 95;
input rsi_os = 5;
input kperiod = 5;
input BB_Length = 13;
input BB_Upper = 1.6;
input BB_Lower = -1.6;

# BollingerBands to confirm COG
def percentB = BollingerPercentB(length = BB_Length, "num dev dn" = BB_Lower, "num dev up" = BB_Upper, "average type" = "EXPONENTIAL");

def MoneyWave = StochasticFull("k period" = 5);

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;

def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

def HurstOsc = ((100 * price / CMA) - 100);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = HurstOsc < -ExtremeValue and MoneyWave <= 20 and RSI <= RSI_os and percentB <= 0 and close >= MovAvgExponential(length = 300);

plot BEARISH = HurstOsc > ExtremeValue and MoneyWave >= 80 and RSI >= RSI_ob and percentB >= 100 and close <= MovAvgExponential(length = 300);

plot RATING = if BULLISH then 1 else if BEARISH then .5 else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.AssignValueColor(Color.RED);

RATING.Hide();

alert((RATING == 1), "CenterofGravity CALL", "alert type" = Alert.BAR, sound = Sound.Ding);
alert((RATING == .5), "CenterofGravity PUT", "alert type" = Alert.BAR, sound = Sound.Ding);
