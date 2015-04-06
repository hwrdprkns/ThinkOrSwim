# HurstOscillator
# DREWGRIFFITH15 (C) 2015

declare lower;

# Daily settings / 15 minute chart

input price = close;
input COGlength = 10;
input InnerValue = 1.6; # 0.40
input OuterValue = 2.6; # 0.65
input ExtremeValue = 4.2; # 1.05

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

plot HurstOsc = if ((100 * price/CMA) - 100) > ExtremeValue then ExtremeValue
else if ((100 * price/CMA) - 100) < -ExtremeValue then -ExtremeValue
else ((100 * price/CMA) - 100);

HurstOsc.SetDefaultColor(GetColor(1));
HurstOsc.SetLineWeight(2);

plot CenterLine = 0;
plot UpperExtremeBand = ExtremeValue;
plot LowerExtremeBand = - ExtremeValue;
plot UpperOuterBand = OuterValue;
plot LowerOuterBand = - OuterValue;
plot UpperInnerBand = InnerValue;
plot LowerInnerBand = - InnerValue;

CenterLine.SetDefaultColor(GetColor(9));
CenterLine.SetLineWeight(1);

UpperExtremeBand.SetDefaultColor(GetColor(4));
UpperExtremeBand.SetLineWeight(1);
UpperExtremeBand.hide();
LowerExtremeBand.SetDefaultColor(GetColor(4));
LowerExtremeBand.SetLineWeight(1);
LowerExtremeBand.hide();

UpperOuterBand.SetDefaultColor(GetColor(5));
UpperOuterBand.SetLineWeight(1);
LowerOuterBand.SetDefaultColor(GetColor(6));
LowerOuterBand.SetLineWeight(1);

UpperInnerBand.SetDefaultColor(GetColor(5));
UpperInnerBand.SetLineWeight(1);
UpperInnerBand.SetStyle(Curve.SHORT_DASH);
LowerInnerBand.SetDefaultColor(GetColor(6));
LowerInnerBand.SetLineWeight(1);
LowerInnerBand.SetStyle(Curve.SHORT_DASH);

# Turn AddClouds off by putting a #-sign at the first position of the lines
AddCloud(UpperOuterBand, UpperInnerBand, color.red);
AddCloud(LowerInnerBand, LowerOuterBand, color.green);
