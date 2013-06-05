##############SwingRatio###############
# WGRIFFITH2 (c) 2013

#Study works only for LONG positions
input timeframe = 3;
input side = "LONG";
input periods = 3; # last number of candlesticks

def new_period = periods - 1;
def Breakout = (CLOSE > HIGHEST(DATA = CLOSE, LENGTH = new_period)[1]) AND VOLUMEAVG(LENGTH = 20) > VOLUMEAVG(LENGTH = 20).VOLAVG;
def RollingLow = Lowest(data = LOW(), length = periods)[1];
def StopLoss = (Low <= RollingLow);
def GreenLMT = Breakout is TRUE;
def RedStopLoss = StopLoss is True;
def ttl_stops = sum(RedStopLoss,timeframe);
def ttl_breaks = sum(GreenLMT,timeframe);

plot ratio = ttl_breaks/if(ttl_stops==0,1.0,ttl_stops);
ratio.setDefaultColor(GetColor(4));

#########################################