# SwingAlertDaily
# DREWGRIFFITH15 (C) 2015

declare upper;
input KPeriod = 5;
input DPeriod = 3;
input SMA_LENGTH = 4;
input OVERSOLD = 20;
input price = close;

# $$$ Wave
def FASTLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD);
def SLOWLINE = StochasticSlow("k period" = KPERIOD, "d period" = DPERIOD).SlowD;

def SMA = SimplemovingAVG(price,SMA_LENGTH);

def GREENPRICE = lowest(FASTLINE,3) <= OVERSOLD and FASTLINE >= SLOWLINE and price >= SMA;

PLOT BULLISH = GREENPRICE and !GREENPRICE[1];

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.ASSIGNVALUECOLOR(if BULLISH == 1 THEN COLOR.GREEN ELSE IF BULLISH == .5 THEN COLOR.YELLOW ELSE Color.WHITE);
