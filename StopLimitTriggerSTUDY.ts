##############StopLMTTrigger###############
# WGRIFFITH2 (c) 2013

input side = "LONG";
input factor = 2;
input periods = 3;

def Breakout = (CLOSE > HIGHEST(DATA = CLOSE, LENGTH = 2)[1]) AND VOLUMEAVG(LENGTH = 50) > VOLUMEAVG(LENGTH = 50).VOLAVG;
def RollingLow = Lowest(data = LOW(), length = periods)[1];
def GreenLMT = Breakout is TRUE;
def RedStopLoss = (Close <= RollingLow);

plot Above = GreenLMT;
plot Below = RedStopLoss;

Below.SetDefaultColor(Color.DOWNTICK);
Below.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Above.SetDefaultColor(Color.UPTICK);
Above.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

#########################################