# CenterOfGravity
# DREWGRIFFITH15 (C) 2015

declare upper;

input price = close;
input COGlength = 10;
input rsi_length = 2;
input kperiod = 5;
input ExtremeValue = 2.6;

def MoneyWave = STOCHASTICSLOW("K PERIOD" = KPERIOD);

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];
def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);
def OscValue = if close > close[1] then high else if close < close[1] then
low else (high + low) / 2;
def HurstOsc = ((100 * OscValue / CMA) - 100);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = HurstOsc < -ExtremeValue and MoneyWave <= 20 and close >= MovAvgExponential(length = 300);

plot BEARISH = HurstOsc > ExtremeValue and MoneyWave >= 80 and close <= MovAvgExponential(length = 300);

plot RATING = if BULLISH then 1 else if BEARISH then .5 else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.AssignValueColor(Color.RED);
