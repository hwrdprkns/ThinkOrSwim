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
dist.SETLINEWEIGHT(3);

plot prev_high = Highest(dist, LENGTH = length)[1];
plot prev_low = Lowest(dist, LENGTH = length)[1];
prev_high.hide();
prev_low.hide();

dist.SETDEFAULTCOLOR(Color.cyan);
dist.AssignValueColor(if dist > prev_high then Color.RED else if dist < prev_low then Color.GREEN else Color.gray);

plot centerline = 0;
centerline.SETDEFAULTCOLOR(Color.yellow);

# Add label
AddLabel(dist, dist, if dist > prev_high then Color.RED else if dist < prev_low then Color.GREEN else Color.gray);