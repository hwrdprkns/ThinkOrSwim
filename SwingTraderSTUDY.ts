# SwingTrader
# DREWGRIFFITH15 (C) 2015

declare upper;

# Daily settings

input price = close;
input rsi_length = 2;
input rsi_ob = 95;
input rsi_os = 5;
input kperiod = 5;
input COGlength = 10;
input InnerValue = 1.0;
input ATRLength = 21;

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

def ATR = Average(TrueRange(high,  close,  low),  ATRLength);

def UpperInnerBand = if !IsNaN(price) then CMA + (ATR * InnerValue) else
Double.NaN;

def LowerInnerBand = if !IsNaN(price) then CMA - (ATR * InnerValue) else
Double.NaN;

# Stochastic
def MoneyWave = StochasticFull("k period" = 5);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], rsi_length);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), rsi_length);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

def HeavyVol = volume > VolumeAvg().VolAvg;

plot BULLISH = MoneyWave <= 20 and RSI <= rsi_os and price <= LowerInnerBand;

plot BEARISH = MoneyWave >= 80 and RSI >= rsi_ob and price >= UpperInnerBand and !HeavyVol;

plot RATING = if BULLISH then 1 else if BEARISH then .5 else 0;

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);

BEARISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BEARISH.AssignValueColor(Color.RED);

RATING.Hide();

alert((RATING == 1), "SwingTrader LE", "alert type" = Alert.BAR, sound = Sound.Ding);
alert((RATING == .5), "SwingTrader SE", "alert type" = Alert.BAR, sound = Sound.Ding);