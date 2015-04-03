# MovingAvgDistance
# DREWGRIFFITH5 (C) 2015

declare lower;

input price = close;
input averageType = {default Exponential, Simple, Weighted, Wilders, Hull};
input length = 300;

def avg;

switch (averageType) {

case Exponential:
    avg = ExpAverage(price, length);
 case Simple:
    avg = Average(price, length);
 case Weighted:
    avg = wma(price, length);
 case Wilders:
    avg = WildersAverage(price, length);
 case Hull:
    avg = HullMovingAvg(price, length);

}

plot dist = ((price - avg) / ((price + avg) / 2)) * 100;
dist.SETDEFAULTCOLOR(Color.cyan);

plot centerline = 0;
centerline.SETDEFAULTCOLOR(Color.yellow);
