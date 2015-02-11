# RSI_SR
# DREWGRIFFITH15 (C) 2015

declare lower;

input RSI_LENGTH = 2;
input SR_LENGTH = 35;
input SMA_LENGTH = 10;
input OVER_BOUGHT = 95;
input OVER_SOLD = 5;
input price = close;

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;

plot RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot RSI_SMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = SMA_LENGTH), 0);

plot SR_HIGH = Round(Highest(RSI, LENGTH = SR_LENGTH), NUMBEROFDIGITS = 0);

plot SR_LOW = Round(Lowest(RSI, LENGTH = SR_LENGTH), NUMBEROFDIGITS = 0);

plot Diff = RSI-RSI_SMA;
Diff.Hide();
Diff.HideBubble();

RSI.AssignValueColor(if RSI >= OVER_BOUGHT then Color.Red else if RSI <= OVER_SOLD then Color.Green else Color.Gray);
RSI.SetLineWeight(3);

RSI_SMA.AssignValueColor(if Diff crosses above 0 then Color.Green else if Diff crosses below 0 then Color.Red else Color.Cyan);
RSI_SMA.SetStyle(Curve.SHORT_DASH);
RSI_SMA.SetLineWeight(1);
RSI_SMA.HideBubble();

SR_HIGH.SetDefaultColor(Color.CYAN);
SR_HIGH.SetLineWeight(1);

SR_LOW.SetDefaultColor(Color.CYAN);
SR_LOW.SetLineWeight(1);

plot OVERBOUGHT = OVER_BOUGHT;
OVERBOUGHT.SetDefaultColor(Color.DARK_GRAY);
OVERBOUGHT.Hide();
OVERBOUGHT.HideBubble();

plot OVERSOLD = OVER_SOLD;
OVERSOLD.SetDefaultColor(Color.DARK_GRAY);
OVERSOLD.Hide();
OVERSOLD.HideBubble();
