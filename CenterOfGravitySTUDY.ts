# CenterOfGravity
# DREWGRIFFITH15 (C) 2015

# Using the Hurst Osc combined with the RSI2 to find extremely oversold stocks
# Stock must have SCTR > 0 and recommended that MoneyWave5 is < 20

declare upper;

input price = close;
input length = 10;
input rsi_length = 2;
input kperiod = 5;
input ExtremeValue = 2.6; # 4.6 if stocks are more volatile
input over_sold = 20;

def MoneyWave = STOCHASTICSLOW("K PERIOD" = KPERIOD);

# Hurst Osc or COG
def displacement = (-length / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(length)) else
CMA[1] + (CMA[1] - CMA[2]);

def OscValue = if close > close[1] then high else if close < close[1] then
low else (high + low) / 2;

def HurstOsc = ((100 * OscValue / CMA) - 100);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BULLISH = HurstOsc < -ExtremeValue and RSI <= 5 and MoneyWave <= over_sold;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);
