# DayTrader
# DREWGRIFFITH15 (C) 2015

declare upper;

# Inputs based on 30 minute chart

input price = close;
input rsi_length = 2;
input rsi_ob = 95;
input rsi_os = 5;
input kperiod = 5;
input COGlength = 20;
input ExtremeValue = 1.6;

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

def HurstOsc = if ((100 * price/CMA) - 100) > ExtremeValue then ExtremeValue
else if ((100 * price/CMA) - 100) < -ExtremeValue then -ExtremeValue
else ((100 * price/CMA) - 100);

# Stochastic
def MoneyWave = StochasticFull("k period" = 5);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = MoneyWave <= 20 and RSI <= RSI_os and HurstOsc <= -ExtremeValue and price < hl2;

plot BEARISH = MoneyWave >= 80 and RSI >= RSI_ob and HurstOsc >= ExtremeValue and price > hl2;

plot RATING = if BULLISH then 1 else if BEARISH then .5 else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.AssignValueColor(Color.RED);

RATING.Hide();

alert((RATING == 1), "CenterofGravity CALL", "alert type" = Alert.BAR, sound = Sound.Ding);
alert((RATING == .5), "CenterofGravity PUT", "alert type" = Alert.BAR, sound = Sound.Ding);
