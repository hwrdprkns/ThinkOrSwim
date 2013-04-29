##############TrailingStopLMT#############
# WGRIFFITH2 (c) 2013

input factor = 2;
input periods = 3;

def target = close + atrWilder()*factor;
def RollingLow = Lowest(data = LOW(), length = periods)[1];

plot LMT = target;
LMT.SetDefaultColor(GetColor(1));

plot StopLoss = RollingLow;
StopLoss.SetDefaultColor(GetColor(5));
##############################################