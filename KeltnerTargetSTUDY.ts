# KeltnerTarget
# wgriffith2 (c) 2013
#

declare weak_volume_dependency;

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

plot Upper_Band = average[-displace] + shift[-displace];
Upper_Band.SETDEFAULTCOLOR(CREATECOLOR(11, 0, 78));