# AdaptiveCOG
# DREWGRIFFITH15 (C) 2015

declare upper;

# Daily settings

input price = close;
input COGlength = 10;
input InnerValue = 1.0;
input OuterValue = 1.6;
input ATRLength = 14;
input showClosingPriceLine = NO;
input showPriceBar = YES;
input smooth = 1;

def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

def ATR = Average(TrueRange(high,  close,  low),  ATRLength);

plot UpperOuterBand = if !IsNaN(price) then CMA + (ATR * OuterValue) else
Double.NaN;
plot LowerOuterBand = if !IsNaN(price) then CMA - (ATR * OuterValue) else
Double.NaN;
plot UpperInnerBand = if !IsNaN(price) then CMA + (ATR * InnerValue) else
Double.NaN;
plot LowerInnerBand = if !IsNaN(price) then CMA - (ATR * InnerValue) else
Double.NaN;

plot rating = if 
close > UpperOuterBand then -1
else if close > UpperInnerBand then -0.5
else if close < LowerInnerBand then 0.5
else if close < LowerInnerBand then 1
else 0;

RATING.Hide();

plot CenterLine = if !IsNaN(price) then CMA else Double.NaN;
CenterLine.DefineColor("CMA", GetColor(1));
CenterLine.DefineColor("Extrapolated", GetColor(0));
CenterLine.AssignValueColor(if !IsNaN(dPrice) then CenterLine.Color("CMA")
else
CenterLine.Color("Extrapolated"));
CenterLine.SetLineWeight(2);
CenterLine.Hide();
CenterLine.SetStyle(Curve.SHORT_DASH);

UpperOuterBand.SetDefaultColor(GetColor(5));
UpperOuterBand.SetLineWeight(2);
LowerOuterBand.SetDefaultColor(GetColor(6));
LowerOuterBand.SetLineWeight(2);

UpperInnerBand.SetDefaultColor(GetColor(5));
UpperInnerBand.SetLineWeight(1);
LowerInnerBand.SetDefaultColor(GetColor(6));
LowerInnerBand.SetLineWeight(1);

# Turn AddClouds off by putting a #-sign at the first position of the lines
AddCloud(UpperOuterBand, UpperInnerBand, Color.RED);
AddCloud(LowerInnerBand, LowerOuterBand, Color.GREEN);

HidePricePlot(!showPriceBar);