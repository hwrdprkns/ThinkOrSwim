# GMMA
# DREWGRIFFITH15 (C) 2015

input EMA1 = 3;
input EMA2 = 5;
input EMA3 = 7;
input EMA4 = 10;
input EMA5 = 12;
input EMA6 = 15;
input EMA7 = 30;
input EMA8 = 35;
input EMA9 = 40;
input EMA10 = 45;
input EMA11 = 50;
input EMA12 = 60;
input show_bubble_labels = yes;

plot GMMA1 = ExpAverage(close, EMA1);
plot GMMA2 = ExpAverage(close, EMA2);
plot GMMA3 = ExpAverage(close, EMA3);
plot GMMA4 = ExpAverage(close, EMA4);
plot GMMA5 = ExpAverage(close, EMA5);
plot GMMA6 = ExpAverage(close, EMA6);
plot GMMA7 = ExpAverage(close, EMA7);
plot GMMA8 = ExpAverage(close, EMA8);
plot GMMA9 = ExpAverage(close, EMA9);
plot GMMA10 = ExpAverage(close, EMA10);
plot GMMA11 = ExpAverage(close, EMA11);
plot GMMA12 = ExpAverage(close, EMA12);

plot signalUP = close > GMMA1 &&
                close > GMMA2 &&
                close > GMMA3 &&
                close > GMMA4 &&
                close > GMMA5 &&
                close > GMMA6 &&
                close > GMMA7 &&
                close > GMMA8 &&
                close > GMMA9 &&
                close > GMMA10 &&
                close > GMMA11 &&
                close crosses above GMMA12;

plot signalDN = close < GMMA1 &&
                close < GMMA2 &&
                close < GMMA3 &&
                close < GMMA4 &&
                close < GMMA5 &&
                close < GMMA6 &&
                close < GMMA7 &&
                close < GMMA8 &&
                close < GMMA9 &&
                close < GMMA10 &&
                close < GMMA11 &&
                close crosses below GMMA12;

# Show Call / Put Signal in a Chart Bubble
AddChartBubble(SignalUp && show_bubble_labels, low - 0.2, "Up", Color.UPTICK, no);
AddChartBubble(SignalDn && show_bubble_labels, high + 0.2, "Dn", Color.LIGHT_RED);

GMMA1.AssignValueColor(Color.BLUE);
GMMA1.HideBubble();
GMMA2.AssignValueColor(Color.BLUE);
GMMA2.HideBubble();
GMMA3.AssignValueColor(Color.BLUE);
GMMA3.HideBubble();
GMMA4.AssignValueColor(Color.BLUE);
GMMA4.HideBubble();
GMMA5.AssignValueColor(Color.BLUE);
GMMA5.HideBubble();
GMMA6.AssignValueColor(Color.BLUE);
GMMA6.HideBubble();
GMMA6.SetLineWeight(3);
GMMA7.AssignValueColor(Color.RED);
GMMA7.HideBubble();
GMMA8.AssignValueColor(Color.RED);
GMMA8.HideBubble();
GMMA9.AssignValueColor(Color.RED);
GMMA9.HideBubble();
GMMA10.AssignValueColor(Color.RED);
GMMA10.HideBubble();
GMMA11.AssignValueColor(Color.RED);
GMMA11.HideBubble();
GMMA12.AssignValueColor(Color.RED);
GMMA12.HideBubble();
GMMA12.SetLineWeight(3);
