# UP vs Down Candles

declare lower;

# Daily settings
input candle_length = 50;
input extreme_indx = 30; # Number of up and down candle in a strong trend

# Global definitions
def h = high;
def l = low;
def c = close;

def cond1 = CompoundValue(1, if IsNaN(c)
                            then cond1[1]
                            else c, c);

plot Up = Sum(close > open, candle_length);
Up.SetDefaultColor(Color.Green);
plot Dn = Sum(close < open, candle_length);
Dn.SetDefaultColor(Color.Red);
def Doji = candle_length - (Up + Dn);
AddCloud(Up, Dn, Color.Green, Color.Red);
AddLabel(1, "Up Candles = " + AsPercent(Up / candle_length) + "  Dn Candles = " + AsPercent(DN / candle_length) + "  Dojis = " + AsPercent(Doji / candle_length), if up > dn then color.green else color.red);

# Find Divergences
def highestHighDn = if Dn < extreme_indx
                 then h
                 else if Dn > extreme_indx and
                         h > highestHighDn[1]
                 then h
                 else highestHighDn[1];
def highestDn = if Dn < Up
                then Dn
                else if Dn > Up and
                        Dn > highestDn[1]
                then Dn
                else highestDn[1];
def DLow = if Dn > extreme_indx and
                  h >= highestHighDn[1] and
                  Dn < highestDn[1] and
                  cond1 within 3 bars and close < open #only want negative close to show signal
               then Up
               else Double.NaN;
plot posDiv = DLow;
posDiv.SetPaintingStrategy(PaintingStrategy.POINTS);
posDiv.SetLineWeight(3);
posDiv.SetDefaultColor(Color.YELLOW);

def highestHighUp = if Up < extreme_indx
                 then h
                 else if Up > extreme_indx and
                         h > highestHighUp[1]
                 then h
                 else highestHighUp[1];
def highestUp = if Up < Dn
                then Up
                else if Up > Dn and
                        Up > highestUp[1]
                then Up
                else highestUp[1];
def DHigh = if Up > extreme_indx and
                  h >= highestHighUp[1] and
                  Up < highestUp[1] and
                  cond1 within 3 bars and close > open #only want positive close to show signal
               then Up
               else Double.NaN;

plot negDiv = DHigh;
negDiv.SetPaintingStrategy(PaintingStrategy.POINTS);
negDiv.SetLineWeight(3);
negDiv.SetDefaultColor(Color.YELLOW);
