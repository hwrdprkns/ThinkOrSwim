# RSIDIVERGENCE
# DREWGRIFFITH15 (C) 2015

declare lower;

input nRSI = 2;
input OverBought = 95;
input OverSold = 5;
input MidLine = 50;
input nTrend = 100;
input TrendLine = {EMA, SMA, default LRL, WMA};

# Global definitions 
def h = high;
def l = low;
def c = close;

def cond1 = CompoundValue(1, if IsNaN(c)
                            then cond1[1] 
                            else c, c);



# RSI Wilder with Divergence Markers
def NetChgAvg = WildersAverage(c - c[1], nRSI);
def TotChgAvg = WildersAverage(AbsValue(c - c[1]), nRSI);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
plot RSI = round(50 * (ChgRatio + 1),0);
RSI.SetLineWeight(3);
RSI.AssignValueColor(if RSI < OverSold then Color.Green else if  RSI > OverBought then Color.Red else Color.Gray);

plot RSItrend;
switch (TrendLine) {
case EMA:
   RSItrend = ExpAverage(RSI, nTrend);
case SMA:
   RSItrend = Average(RSI, nTrend);
case LRL:
   RSItrend = InertiaAll(RSI, nTrend);
case WMA:
   RSItrend = WMA(RSI, nTrend);
}
RSItrend.SetLineWeight(1);
RSItrend.SetDefaultColor(Color.RED);

plot RSIOB = OverBought;
RSIOB.SetLineWeight(1);
RSIOB.SetDefaultColor(Color.Blue);
plot RSIOS = OverSold;
RSIOS.SetLineWeight(1);
RSIOS.SetDefaultColor(Color.Blue);

def lowestLow = if RSI > OverSold
               then l
               else if RSI < OverSold and 
                       l < lowestLow[1]
               then l
               else lowestLow[1];
def lowestRSI = if RSI > MidLine
               then RSI
               else if RSI < MidLine and 
                       RSI < lowestRSI[1]
               then RSI
               else lowestRSI[1];
def divergentLow = if RSI < OverSold and
                  l <= lowestLow[1] and 
                  RSI > lowestRSI[1]
                  then OverSold
                  else Double.NaN;
plot DLow = divergentLow;
DLow.SetPaintingStrategy(PaintingStrategy.POINTS);
DLow.SetLineWeight(3);
DLow.SetDefaultColor(Color.YELLOW);

def highestHigh = if RSI < OverBought
                 then h
                 else if RSI > OverBought and 
                         h > highestHigh[1]
                 then h
                 else highestHigh[1];
def highestRSI = if RSI < MidLine
                then RSI
                else if RSI > MidLine and 
                        RSI > highestRSI[1]
                then RSI
                else highestRSI[1];
def divergentHigh = if RSI > OverBought and
                      h >= highestHigh[1] and 
                      RSI < highestRSI[1] and
                      cond1 within 3 bars
                   then OverBought
                   else Double.NaN;

plot DHigh = divergentHigh;
DHigh.SetPaintingStrategy(PaintingStrategy.POINTS);
DHigh.SetLineWeight(3);
DHigh.SetDefaultColor(Color.YELLOW);

def AlertCond1 = DHigh == OverBought;
def AlertCond2 = DLow == OverSold;

#Alert(AlertCond1, "Divergent High", Alert.Bar, Sound.Bell);
#Alert(AlertCond1, "Divergent Low", Alert.Bar, Sound.Bell);