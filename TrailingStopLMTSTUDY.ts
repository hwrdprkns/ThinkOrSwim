##############TrailingStopLMT#############
# WGRIFFITH2 (c) 2013

#Study works only for LONG positions
input side = "LONG";
input factor = 1;
input periods = 3;

def atr = close + atrWilder()*factor;
def RollingLow = Lowest(data = LOW(), length = periods)[1];

plot Pyramid = atr;
Pyramid.SetDefaultColor(GetColor(9));

plot StopLoss = RollingLow[-1];
StopLoss.SetDefaultColor(GetColor(5));
##############################################