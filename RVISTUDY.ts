# RVI
# DREWGRIFFITH15 (c) 2014

# Study combines Relative Strength Index and Relative Volatility Index

declare lower;

input length = 5;
input over_Bought = 80;
input over_Sold = 20;
input price = close;

# RSI
def NetChgAvg = WildersAverage(price - price[1], length);
def TotChgAvg = WildersAverage(AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

# RVI
def highPrice = StDev(high, length);
def lowPrice = StDev(low, length);

def highAvgUp = ExpAverage(if high > high[1] then highPrice else 0, length);
def highAvgDown = ExpAverage(if high < high[1] then highPrice else 0, length);

def lowAvgUp = ExpAverage(if low > low[1] then lowPrice else 0, length);
def lowAvgDown = ExpAverage(if low < low[1] then lowPrice else 0, length);

def highRVI = 100 - 100 / (1 + highAvgUp / highAvgDown);
def lowRVI = 100 - 100 / (1 + lowAvgUp / lowAvgDown);

def RVI = (highRVI + lowRVI) / 2;
def RSI = 50 * (ChgRatio + 1);
plot TOT = (RVI + RSI) / 2;
plot OverSold = over_Sold;
plot OverBought = over_Bought;

TOT.DefineColor("OverBought", GetColor(5));
TOT.DefineColor("Normal", GetColor(7));
TOT.DefineColor("OverSold", GetColor(1));
TOT.AssignValueColor(if TOT > over_Bought then TOT.Color("OverBought") else if TOT < over_Sold then TOT.Color("OverSold") else TOT.Color("Normal"));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
