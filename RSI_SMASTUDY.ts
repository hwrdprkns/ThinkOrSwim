# RSI_SMA
# wgriffith2 (c) 2013
#

declare lower;

input length = 14;
input over_Bought = 70;
input over_Sold = 30;
input price = close;
input sma_length = 12;

def NetChgAvg = WildersAverage(price - price[1], length);
def TotChgAvg = WildersAverage(AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI_OUT = 50 * (ChgRatio + 1);
def SMA = SimpleMovingAvg(price = RSI_OUT, length = sma_length);

plot RSI = RSI_OUT;
plot RSI_SMA = SMA;
plot OverSold = over_Sold;
plot OverBought = over_Bought;

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.color("OverBought") else if RSI < over_Sold then RSI.color("OverSold") else RSI.color("Normal"));
RSI_SMA.SetDefaultColor(GetColor(1));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));