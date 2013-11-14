# keltnerchannelssignal
# wgriffith2 (c) 2013

input displace = 0;
input factor = 2.5;
input length = 20;
input price = close;
input AverageType = {default SMA, EMA};

def shift = factor * AvgTrueRange(high, close, low, length);

def average;
switch (AverageType) {
case SMA:
    average = Average(price, length);
case EMA:
    average = ExpAverage(price, length);
}

def Avg = average[-displace];
def Upper_Band = average[-displace] + shift[-displace];
def Lower_Band = average[-displace] - shift[-displace];

# entry
def entry = low[1] < lower_band and open > high[1] and price > Lower_Band and price > price[1];

# exit
def rollinglow = lowest(data = low(), length = 3)[1];
def stoploss = (low < rollinglow);
def target = high >= Upper_Band;
def exit = (target is true or stoploss is true) and entry is false;

plot above = entry;
plot below = exit;

below.setdefaultcolor(createcolor(255, 0, 0));
below.setpaintingstrategy(paintingstrategy.boolean_arrow_down);
above.setdefaultcolor(createcolor(0, 255, 0));
above.setpaintingstrategy(paintingstrategy.boolean_arrow_up);