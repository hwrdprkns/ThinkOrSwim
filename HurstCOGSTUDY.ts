# HurstCOG
# DREWGRIFFITH15 (C) 2015

declare upper;

# Daily settings / 15 minute chart

input price = close;
input COGlength = 10; #60
input InnerValue = 2.6; #1.6
input OuterValue = 5.0; #2.6
input ExtremeValue = 10.0; #4.0
input showClosingPriceLine = NO;
input showPriceBar = YES;
input smooth = 1;

def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

plot CenteredMA = if !IsNaN(dPrice) then CMA else Double.NaN;
CenteredMA.DefineColor("CMA", GetColor(1));
CenteredMA.SetLineWeight(2);
CenteredMA.Hide();

plot CenterLine = if !IsNaN(price) then CMA else Double.NaN;
CenterLine.DefineColor("CMA", GetColor(1));
CenterLine.DefineColor("Extrapolated", GetColor(0));
CenterLine.AssignValueColor(if !IsNaN(dPrice) then CenterLine.color("CMA")
else
CenterLine.color("Extrapolated"));
CenterLine.SetLineWeight(2);
CenterLine.Hide();
CenterLine.SetStyle(Curve.SHORT_DASH);

def ExtremeBand = CMA * ExtremeValue / 100;;
def OuterBand = CMA * OuterValue / 100;
def InnerBand = CMA * InnerValue / 100;

plot UpperExtremeBand = if !IsNaN(price) then CMA + ExtremeBand else
Double.Nan;
plot LowerExtremeBand = if !IsNaN(price) then CMA - ExtremeBand else
Double.Nan;
plot UpperOuterBand = if !IsNaN(price) then CMA + OuterBand else
Double.Nan;
plot LowerOuterBand = if !IsNaN(price) then CMA - OuterBand else
Double.Nan;
plot UpperInnerBand = if !IsNaN(price) then CMA + InnerBand else
Double.Nan;
plot LowerInnerBand = if !IsNaN(price) then CMA - InnerBand else
Double.Nan;

UpperExtremeBand.SetDefaultColor(GetColor(4));
UpperExtremeBand.SetLineWeight(1);
LowerExtremeBand.SetDefaultColor(GetColor(4));
LowerExtremeBand.SetLineWeight(1);
UpperExtremeBand.hide();
LowerExtremeBand.hide();

UpperOuterBand.SetDefaultColor(GetColor(5));
UpperOuterBand.SetLineWeight(2);
LowerOuterBand.SetDefaultColor(GetColor(6));
LowerOuterBand.SetLineWeight(2);

UpperInnerBand.SetDefaultColor(GetColor(9));
UpperInnerBand.SetLineWeight(1);
UpperInnerBand.Hide();
UpperInnerBand.SetStyle(Curve.SHORT_DASH);
LowerInnerBand.SetDefaultColor(GetColor(9));
LowerInnerBand.SetLineWeight(1);
LowerInnerBand.Hide();
LowerInnerBand.SetStyle(Curve.SHORT_DASH);

# Turn AddClouds off by putting a #-sign at the first position of the lines
AddCloud(UpperOuterBand, UpperInnerBand, color.red);
AddCloud(LowerInnerBand, LowerOuterBand, color.green);

plot FlowPrice = if showClosingPriceLine then Average(price, smooth)
else double.nan;
FlowPrice.SetDefaultColor(GetColor(9));
FlowPrice.SetLineWeight(2);

hidePricePlot(!showPriceBar);
