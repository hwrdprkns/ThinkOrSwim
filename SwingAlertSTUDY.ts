# SwingAlert
# DREWGRIFFITH15 (C) 2014

declare upper;
input KPERIOD = 14;
input DPERIOD = 1;
input OVERBOUGHT = 80;
input OVERSOLD = 20;
input cutoffLength = 10;
input cutoffsmoother = 14;

# Ehler's COG
def price = close;
def roofCutoffLength = 48;

assert(roofCutoffLength > 0, "roofCutoffLength must be positive: " + roofCutoffLength);

def alpha1 = (Cos(Sqrt(2) * Double.Pi / roofCutoffLength) + Sin (Sqrt(2) * Double.Pi / roofCutoffLength) - 1) / Cos(Sqrt(2) * Double.Pi / roofCutoffLength);
def highpass = if IsNaN(price + price[1] + price[2]) then highpass[1] else Sqr(1 - alpha1 / 2) * (price - 2 * price[1] + price[2]) + 2 * (1 - alpha1) * highpass[1] - Sqr(1 - alpha1) * highpass[2];
def RoofingFilter = if !IsNaN(price) then reference EhlersSuperSmootherFilter(highpass, cutoffLength) else Double.NaN;
def Lag = RoofingFilter[1];
def Diff = RoofingFilter-Lag;

# STOCHASTICSLOW
def FASTLINE = round(StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD),0);

# FILTER
DEF EhlerSmoother = CLOSE > EhlersSuperSmootherFilter(CLOSE,cutoffsmoother);

# NEW HIGH /LOW
def NEW_HIGH = close > highest(high,2)[1];

DEF BULLISH =
NEW_HIGH
and EhlerSmoother
and Diff > 0
and lowest(fastline,2)[1] <= OVERSOLD;

PLOT BUY = BULLISH and !BULLISH[1];

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BUY.AssignValueColor(Color.GREEN);
