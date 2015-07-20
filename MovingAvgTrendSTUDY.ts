# Use this study on multiple time frames, you will see trends.
# All timeframes must show short (2) or long (1) to initiate a purchase.

input short_average = 5;
input medium_average = 10;
input long_average = 20;
input average_type = {default "SMA", "EMA", "WMA"};

def MA1;
def MA2;
def MA3;
switch (average_type) {

case "SMA":
    MA1 = Average(close, short_average);
    MA2 = Average(close, medium_average);
    MA3 = Average(close, long_average);

case "EMA":
    MA1 = ExpAverage(close, short_average);
    MA2 = ExpAverage(close, medium_average);
    MA3 = ExpAverage(close, long_average);

case "WMA":
    MA1 = WildersSmoothing(close, short_average);
    MA2 = WildersSmoothing(close, medium_average);
    MA3 = WildersSmoothing(close, long_average);
}

def Eup = if MA1 > MA2 && MA2 > MA3 then 1 else
0;
def Edn = if MA1 < MA2 && MA2 < MA3 then 1 else
0;
plot signal = if Eup then 1 else if Edn then 2 else 0;

signal.AssignValueColor(if Eup then Color.LIGHT_GREEN
else if Edn then Color.LIGHT_RED else Color.GRAY);

AssignBackgroundColor(if Eup then
Color.LIGHT_GREEN else if Edn then Color.LIGHT_RED else
Color.GRAY);
