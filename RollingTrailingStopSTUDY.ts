##############RollingTrailingStop#############
# WGRIFFITH2 (c) 2013

input periods = 3;
def RollingLow = Lowest(data = LOW(), length = periods)[1];

plot StopLoss = RollingLow;

StopLoss.SetDefaultColor(Color.DOWNTICK);
StopLoss.SetPaintingStrategy(PaintingStrategy.POINTS);

##############################################