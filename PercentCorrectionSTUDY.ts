# PercentCorrection

# designed for use on daily charts

input periods = 252;

def mode = if close > close[periods] then 1 #BULL
    else 0; #BEAR

def highprint = if mode == 1 then if high > highprint[1] then high else highprint[1] else high;
def lowprint = if mode == 0 then if low < lowprint[1] then low else lowprint[1] else low;

def onepercent = if mode == 1 then highprint * 0.01 else -lowprint * 0.01;
def base = if mode == 1 then highprint else lowprint;

plot p5 = base - onepercent * 5 * 1;
plot p10 = base - onepercent * 10 * 1;

p5.HideBubble();
p10.HideBubble();

AddChartBubble(yes, if IsNaN(close[-1]) then  p5 else Double.NaN, Concat("-", Concat(5 * 1, "%")), Color.WHITE);
AddChartBubble(yes,  if IsNaN(close[-1]) then p10 else Double.NaN, Concat("-", Concat(10 * 1, "%")), Color.WHITE);
