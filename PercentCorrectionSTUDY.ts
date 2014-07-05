# TS_PercentCorrection
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 22 May 2010
 
# Designed for use on daily charts
 
input startDateYYYYMMDD = 20100101;
input mode = {default Bull, Bear};
input spacing = 1.0;
 
def start = if getYyyyMmDd() > startDateYYYYMMDD then 1 else 0;
 
rec highPrint = compoundValue(1, if start then if high > highPrint[1] then high else highPrint[1] else high , high);
rec lowPrint = compoundValue(1, if start then if low < lowPrint[1] then low else lowPrint[1] else low , low);
 
def onePercent = if mode == mode.Bull then highPrint * 0.01 else -lowPrint * 0.01;
def base = if mode == mode.Bull then highPrint else lowPrint;
 
plot hp = if start then base else double.nan;

plot p5 = if start then base - onePercent * 5 * spacing else double.nan;
plot p10 = if start then base - onePercent * 10 * spacing else double.nan;
 
hp.HideBubble();
p5.HideBubble();
p10.HideBubble();
 
AddChartBubble(yes, if IsNaN(close[-1]) then  p5 else double.nan, concat("-", concat(5 * spacing, "%")), color.white);
AddChartBubble(yes,  if IsNaN(close[-1]) then p10 else double.nan, concat("-", concat(10 * spacing, "%")), color.white);
 
hp.HideTitle();
p5.HideTitle();
p10.HideTitle();