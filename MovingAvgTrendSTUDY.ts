# Use this study on multiple time frames, you will see trends.
# All timeframes must show short (2) or long (1) to initiate a purchase.

declare lower;

input MA = {EMA, default SMA, WMA};
input short_length = 5;
input medium_length = 10;
input long_length = 20;

plot signal = if MovingAverage(MA,CLOSE, length = medium_length) > MovingAverage(MA,CLOSE, length = long_length) and
MovingAverage(MA,CLOSE, length = short_length) > MovingAverage(MA,CLOSE, length = medium_length) then 1
else if MovingAverage(MA,CLOSE, length = medium_length) < MovingAverage(MA,CLOSE, length = long_length) and
MovingAverage(MA,CLOSE, length = short_length) < MovingAverage(MA,CLOSE, length = medium_length) then 2
else 0;

signal.AssignValueColor(if signal == 1 then Color.Green else if signal == 2 then Color.Red else Color.Gray);
AssignPriceColor(if signal == 1 then Color.Green else if signal == 2 then Color.Red else Color.Gray);
