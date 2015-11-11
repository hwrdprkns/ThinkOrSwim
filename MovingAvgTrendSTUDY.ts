# MovingAvgTrend
declare upper;
input ultra_short_average = 20;
input short_average = 31;
input medium_average = 50;
input long_average = 100;
input ultra_long_average = 200;
input average_type = {default "SMA", "EMA"};
input show_vertical_line = no;
input show_bubble_labels = yes;

def MA1;
def MA2;
def MA3;
def ma4;
def ma5;
switch (average_type) {
case "SMA":
    MA1 = Average(close, ultra_short_average);
    MA2 = Average(close, short_average);
    MA3 = Average(close, medium_average);
    MA4 = Average(close, long_average);
    MA5 = Average(close, ultra_long_average);
case "EMA":
    MA1 = Average(close, ultra_short_average);
    MA2 = Average(close, short_average);
    MA3 = Average(close, medium_average);
    MA4 = Average(close, long_average);
    MA5 = Average(close, ultra_long_average);
}

# define e-signal and crossover point
def Eup = MA1 > MA2 && MA2 > MA3 && MA4 > MA5;
def Edn = MA1 < MA2 && MA2 < MA3 && MA4 < MA5;

def CrossUp = close > MA1 && Eup && !Eup[1];
def CrossDn = close < MA1 && Edn && !Edn[1];

# Define up and down signals
def higherHigh = close > Highest(max(open,close), 3)[1];
def lowerLow = close < Lowest(min(open,close), 3)[1];
def SignalUp = if (CrossUp && higherHigh)
    then 1
        else if    (CrossUp[1] && higherHigh && !higherHigh[1])
    then 1
        else if    (CrossUp[2] && higherHigh && !higherHigh[1] && !higherHigh[2])
    then 1
        else Double.NaN;

def SignalDn = if (CrossDn && lowerLow)
    then 1
        else if (CrossDn[1] && lowerLow && !lowerLow[1])
    then 1
        else if (CrossDn[2] && lowerLow && !lowerLow[1] && !lowerLow[2])
    then 1
        else Double.NaN;


# Plot the moving average lines
plot ln1 = MA1;
ln1.SetDefaultColor(CreateColor(145, 210, 144));
ln1.SetLineWeight(2);
plot ln2 = MA2;
ln2.SetDefaultColor(CreateColor(111, 183, 214));
ln2.SetLineWeight(2);
plot ln3 = MA3;
ln3.SetDefaultColor(CreateColor(249, 140, 182));
ln3.SetLineWeight(2);
plot ln4 = MA4;
ln4.SetDefaultColor(CreateColor(140, 140, 140));
ln4.SetLineWeight(2);
plot ln5 = MA5;
ln5.SetDefaultColor(CreateColor(120, 120, 250));
ln5.SetLineWeight(2);

# Draw vertical line to indicate call and put signals
AddVerticalLine(SignalUp && show_vertical_line, "Up", Color.UPTICK);
AddVerticalLine(SignalDn && show_vertical_line, "Down", Color.LIGHT_RED);

# Show Call / Put Signal in a Chart Bubble
AddChartBubble(SignalUp && show_bubble_labels, low - 0.3, "Up", Color.UPTICK, no);
AddChartBubble(SignalDn && show_bubble_labels, high + 0.3, "Dn", Color.LIGHT_RED);

# Add label for Eup or Edn
AddLabel(SignalUp, "E Up", Color.GREEN);
AddLabel(SignalDn, "E Dn", Color.RED);

# Alerts
alert(SignalUp, "E Up", "alert type" = Alert.BAR, sound = Sound.Ding);
alert(SignalDn, "E Dn", "alert type" = Alert.BAR, sound = Sound.Ding);
