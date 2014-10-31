declare upper;

input price = hl2;
input length = 10;
input InnerValue = 1.6;
input OuterValue = 2.6;
input ExtremeValue = 4.2;
input showClosingPriceLine = NO;
input showPriceBar = YES;
input smooth = 1;

def displacement = (-length / 2) + 1;
def dPrice = price[displacement];

rec CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(length)) else
CMA[1] + (CMA[1] - CMA[2]);

plot CenteredMA = if !IsNaN(dPrice) then CMA else Double.NaN;
CenteredMA.DefineColor("CMA", GetColor(1));
CenteredMA.SetLineWeight(2);

plot CenterLine = if !IsNaN(price) then CMA else Double.NaN;
CenterLine.DefineColor("CMA", GetColor(1));
CenterLine.DefineColor("Extrapolated", GetColor(0));
CenterLine.AssignValueColor(if !IsNaN(dPrice) then CenterLine.color("CMA")
else
CenterLine.color("Extrapolated"));
CenterLine.SetLineWeight(2);
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
UpperExtremeBand.SetLineWeight(2);
LowerExtremeBand.SetDefaultColor(GetColor(4));
LowerExtremeBand.SetLineWeight(2);
UpperExtremeBand.hide();
LowerExtremeBand.hide();

UpperOuterBand.SetDefaultColor(GetColor(5));
UpperOuterBand.SetLineWeight(2);
LowerOuterBand.SetDefaultColor(GetColor(6));
LowerOuterBand.SetLineWeight(2);

UpperInnerBand.SetDefaultColor(GetColor(9));
UpperInnerBand.SetLineWeight(1);
UpperInnerBand.SetStyle(Curve.SHORT_DASH);
LowerInnerBand.SetDefaultColor(GetColor(9));
LowerInnerBand.SetLineWeight(1);
LowerInnerBand.SetStyle(Curve.SHORT_DASH);

# Turn AddClouds off by putting a #-sign at the first position of the lines
AddCloud(UpperOuterBand, UpperInnerBand, color.red);
AddCloud(LowerInnerBand, LowerOuterBand, color.green);

def FlowValue = if close > close[1] then high else if close < close[1] then
low else (high + low)/2;

plot FlowPrice = if showClosingPriceLine then Average(FlowValue, smooth)
else double.nan;
FlowPrice.SetDefaultColor(GetColor(9));
FlowPrice.SetLineWeight(2);

hidePricePlot(!showPriceBar);
