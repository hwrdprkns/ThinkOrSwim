# RSI_SR
# DREWGRIFFITH15 (C) 2014

declare lower;

input RSI_LENGTH = 14;
input SR_LENGTH = 40;
input SMA_LENGTH = 10;
input OVER_BOUGHT = 70;
input OVER_SOLD = 30;

# RSI
def NETCHGAVG = WildersAverage(close - close[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;

plot RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot SR_HIGH = Round(Highest(RSI, LENGTH = SR_LENGTH), NUMBEROFDIGITS = 0);

plot SR_LOW = Round(Lowest(RSI, LENGTH = SR_LENGTH), NUMBEROFDIGITS = 0);

plot RSI_SMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = SMA_LENGTH), 0);

RSI.SetDefaultColor(Color.GRAY);
RSI.SetLineWeight(3);

SR_HIGH.SetDefaultColor(Color.CYAN);
#SR_HIGH.SetStyle(Curve.SHORT_DASH);
SR_HIGH.SetLineWeight(1);

SR_LOW.SetDefaultColor(Color.CYAN);
#SR_LOW.SetStyle(Curve.SHORT_DASH);
SR_LOW.SetLineWeight(1);

RSI_SMA.ASSIGNVALUECOLOR(if RSI CROSSES RSI_SMA THEN COLOR.GREEN ELSE Color.CYAN);
RSI_SMA.SetStyle(Curve.SHORT_DASH);
RSI_SMA.SetLineWeight(1);

plot OVERBOUGHT = OVER_BOUGHT;
OVERBOUGHT.SetDefaultColor(Color.DARK_GRAY);
OVERBOUGHT.Hide();
OVERBOUGHT.HideBubble();

plot OVERSOLD = OVER_SOLD;
OVERSOLD.SetDefaultColor(Color.DARK_GRAY);
OVERSOLD.Hide();
OVERSOLD.HideBubble();
