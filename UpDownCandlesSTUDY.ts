# UP vs Down Candles
# DREWGRIFFITH15 (C) 2017
 
declare lower;
 
# Daily settings
input candle_length = 10;
input extreme_indx = 8; # Number of up and down candle in a strong trend

# Global definitions 
def h = high;
def l = low;
def c = close;
 
plot Up = Sum(close > open, candle_length);
Up.SetDefaultColor(Color.Green);
plot Dn = Sum(close < open, candle_length);
Dn.SetDefaultColor(Color.Red);
def Doji = candle_length - (Up + Dn);
AddCloud(Up, Dn, Color.Green, Color.Red);
AddLabel(1, "Up Candles = " + AsPercent(Up / candle_length) + "  Dn Candles = " + AsPercent(DN / candle_length) + "  Dojis = " + AsPercent(Doji / candle_length), if up > dn then color.green else color.red);

def DLow = if Dn >= extreme_indx then Up
               else Double.NaN;
plot posDiv = DLow;
posDiv.SetPaintingStrategy(PaintingStrategy.POINTS);
posDiv.SetLineWeight(2);
posDiv.SetDefaultColor(Color.YELLOW);
 
def DHigh = if Up >= extreme_indx then Up
               else Double.NaN;

plot negDiv = DHigh;
negDiv.SetPaintingStrategy(PaintingStrategy.POINTS);
negDiv.SetLineWeight(2);
negDiv.SetDefaultColor(Color.YELLOW);