##############RollingTrailingStop#############
# WGRIFFITH2 (c) 2013

input periods = 3;
def RollingLow = Lowest(data = LOW(), length = periods)[1];

plot StopLoss = RollingLow[-1];

StopLoss.SetDefaultColor(CreateColor(11, 0, 78));

##############################################