# RSI_SR
# wgriffith2 (c) 2014

declare lower;

input rsi_length = 14;
input rsi_sr = 21;
input sma_length = 12;
input over_bought = 70;
input over_sold = 30;

# rsi
def netchgavg = WildersAverage(close - close[1], rsi_length);
def totchgavg = WildersAverage(AbsValue(close - close[1]), rsi_length);
def chgratio = if totchgavg != 0 then netchgavg / totchgavg else 0;

def rsi = Round(50 * (chgratio + 1), numberofdigits = 0);

def rsi_low1 = 
Round(Lowest(rsi, length = rsi_sr), numberofdigits = 0);
def rsi_high1 = 
Round(Highest(rsi, length = rsi_sr), numberofdigits = 0);

def sma = round(SimpleMovingAvg(price = rsi, length = sma_length),0);

plot rsi_plot = rsi;
plot rsi_sma = sma;
plot rsi1mh = rsi_high1;
plot rsi1ml = rsi_low1;
plot oversold = over_sold;
plot overbought = over_bought;

rsi_plot.DefineColor("overbought", GetColor(5));
rsi_plot.DefineColor("normal", GetColor(7));
rsi_plot.DefineColor("oversold", GetColor(1));
rsi_plot.AssignValueColor(if rsi > over_bought then rsi_plot.Color("overbought") else if rsi < over_sold then rsi_plot.Color("oversold") else rsi_plot.Color("normal"));
rsi_sma.SetDefaultColor(GetColor(1));
oversold.SetDefaultColor(GetColor(8));
overbought.SetDefaultColor(GetColor(8));
rsi1ml.SetDefaultColor(GetColor(1));
rsi1mh.SetDefaultColor(GetColor(5));