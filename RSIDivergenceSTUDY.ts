plot Data = close;
declare lower;

input nRSI = 14;        #hint nRSI: RSI periods
input nTrend = 100;     #hint nTrend: RSI Trend Line periods
input over_Bought = 70; #hint over_Bought: Over Bought Line
input over_Sold = 30;   #hint over_Sold: Over Sold Line
input MidLine = 50;     #hint MidLine: MidLine
input TrendLine = {EMA, SMA, default LRL, WMA};
input AlertOn = yes;

def o = open;
def h = high;
def l = low;
def c = close;
def NetChgAvg = WildersAverage(c - c[1], nRSI);
def TotChgAvg = WildersAverage(AbsValue(c - c[1]), nRSI);
def ChgRatio = if TotChgAvg != 0
              then NetChgAvg / TotChgAvg
              else 0;

plot RSI = 50 * (ChgRatio + 1);
plot OverSold = over_Sold;
plot OverBought = over_Bought;
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

def lowestLow = if RSI > over_Sold
               then l
               else if RSI < over_Sold and
                       l < lowestLow[1]
               then l
               else lowestLow[1];
def lowestRSI = if RSI > MidLine
               then RSI
               else if RSI < MidLine and
                       RSI < lowestRSI[1]
               then RSI
               else lowestRSI[1];
def divergentLow = if RSI < over_Sold and
                     l <= lowestLow[1] and
                     RSI > lowestRSI[1]
                  then over_Sold
                  else Double.NaN;
plot DLow = divergentLow;
   DLow.SetPaintingStrategy(PaintingStrategy.POINTS);
   DLow.SetLineWeight(2);
   DLow.SetDefaultColor(Color.YELLOW);

def highestHigh = if RSI < over_Bought
                 then h
                 else if RSI > over_Bought and
                         h > highestHigh[1]
                 then h
                 else highestHigh[1];
def highestRSI = if RSI < MidLine
                then RSI
                else if RSI > MidLine and
                        RSI > highestRSI[1]
                then RSI
                else highestRSI[1];
def divergentHigh = if RSI > over_Bought and
                      h >= highestHigh and
                      RSI < highestRSI
                   then over_Bought
                   else if RSI < over_Bought and
                   c < o
                   then Double.Nan
                   else divergentHigh[1];

plot DHigh = divergentHigh;
   DHigh.SetPaintingStrategy(PaintingStrategy.POINTS);
   DHigh.SetLineWeight(2);
   DHigh.SetDefaultColor(Color.YELLOW);

   RSI.DefineColor("OverBought", GetColor(5));
   RSI.DefineColor("Normal", GetColor(7));
   RSI.DefineColor("OverSold", GetColor(1));
   RSI.AssignValueColor(if RSI > over_Bought
                        then RSI.Color("OverBought")
                        else if RSI < over_Sold
                        then RSI.Color("OverSold")
                        else RSI.Color("Normal"));
   OverSold.SetDefaultColor(Color.BLUE);
   OverBought.SetDefaultColor(Color.BLUE);

def AlertCond1 = RSI crosses RSItrend;

#Alert(AlertCond1, "RSI crossed RSI Trend Line", Alert.Bar, Sound.Bell);

# End Code Wilders RSI with Divergence
