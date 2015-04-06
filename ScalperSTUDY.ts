# Scalper
# DREWGRIFFITH15 (C) 2015

# inputs based on 2 minute chart

declare upper;

input price = close;
input BBlength = 12;
input FSOkperiod = 10;
input FSOdperiod = 6;
input FSOslowingperiod = 6;
input FSOob = 80;
input FSOos = 20;
input RSIlength = 12;
input RSIob = 70;
input RSIos = 30;
input MFILength = 12;
input MFIob = 80;
input MFIos = 20;
input IMILength = 12;
input IMIob = 70;
input IMIos = 30;


def BBupper = BollingerBands(length = BBlength).UpperBand;
def BBlower = BollingerBands(length = BBlength).LowerBand;

# StochasticFull
def FSO = StochasticFull("k period" = FSOkperiod, "d period" = FSOdperiod, "slowing_period" = FSOslowingperiod);

def RSI = RSI(length = RSIlength);

def MFI = MoneyFlowIndex(length = MFILength);

def IMI = IntradayMomentumIndex(length = IMILength);

plot bullish = close <= BBlower and RSI <= RSIos and FSO <= FSOos and MFI <= MFIos and IMI <= IMIob;

plot bearish = close >= BBupper and RSI >= RSIob and FSO >= FSOob and MFI >= MFIob and IMI >= IMIos;

plot RATING = if bullish then 1 else if bearish then .5 else 0;

bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
bullish.AssignValueColor(Color.GREEN);

bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
bearish.AssignValueColor(Color.RED);
