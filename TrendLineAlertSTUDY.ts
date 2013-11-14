# TrendLineAlert
 
input startDateYyyyMmDd = 20131008;
input endDateYyyyMmDd = 20131112;
input mode = {default upTrend, downTrend};
 
defineGlobalColor("UpTrend", color.green);
defineGlobalColor("DownTrend", color.red);
defineGlobalColor("Extension", color.white);
 
def start = if getYyyyMmDd()==startDateYyyyMmDd then 1 else 0;
def end = if getYyyyMmDd()==endDateYyyyMmDd then 1 else 0;
 
rec startPrice = if start and mode==mode.upTrend then low else if start and mode==mode.downTrend then high else startPrice[1];
rec startBar = if start then barNumber() else startBar[1];
 
rec endPrice = if end and mode==mode.upTrend then low else if end and mode==mode.downTrend then high else endPrice[1];
rec endBar = if end then barNumber() else endBar[1];
 
plot trendLine = if start  then startPrice else if end  then endPrice else double.nan;
trendLine.enableApproximation();
trendLine.assignValueColor(if mode==mode.upTrend then globalColor("UpTrend") else globalColor("DownTrend"));
trendLine.setLineWeight(2);
 
rec extend = if end and close then 1 else extend[1];
def slope = (endPrice-startPrice)/(endBar-startBar);
 
def curPrice = (barNumber()-endBar)*slope+endPrice;
plot extension = if extend then curPrice else double.nan;
extension.setDefaultColor(color.white);
extension.setLineWeight(2);
extension.setStyle(curve.SHORT_DASH);
 
def trendLineViolation = if (mode==mode.upTrend and close < extension and close[1] > extension[1]) or (mode==mode.downTrend and close > extension and close[1]<extension[1]) then 1 else 0;
 
plot breach = if trendLineViolation then extension else double.nan;
breach.setStyle(curve.POINTS);
breach.assignValueColor(if mode==mode.upTrend then color.red else color.green);
breach.setLineWeight(5);
 
rec violated = if trendLineViolation[1] then 1 else violated[1];
extension.assignValueColor(if violated then color.gray else globalColor("Extension"));
 
alert(trendLineViolation, concat(getSymbolPart(), " trend line violation"), alert.BAR, sound.Ring);