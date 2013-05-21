##############StopLMTTrigger###############
# WGRIFFITH2 (c) 2013

input side = "LONG";
input periods = 3; # last number of candlesticks

def new_period = periods - 1;
def Breakout = (CLOSE > HIGHEST(DATA = CLOSE, LENGTH = new_period)[1]) AND VOLUMEAVG(LENGTH = 20) > VOLUMEAVG(LENGTH = 20).VOLAVG;
def RollingLow = Lowest(data = LOW(), length = periods)[1];
def GreenLMT = Breakout is TRUE;
def RedStopLoss = (Low <= RollingLow);

plot Above = GreenLMT;
plot Below = RedStopLoss;

Below.SetDefaultColor(Color.DOWNTICK);
Below.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Above.SetDefaultColor(Color.UPTICK);
Above.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

#########################################