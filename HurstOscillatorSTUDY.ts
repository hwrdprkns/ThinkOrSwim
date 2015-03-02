# HurstOscillator
# DREWGRIFFITH15 (C) 2015

# AKA: CenterOfGravity Osc

declare lower;

input price = close;
input length = 10;
input InnerValue = 1.6;
input OuterValue = 2.6;
input ExtremeValue = 4.2;

def displacement = (-length / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(length)) else
CMA[1] + (CMA[1] - CMA[2]);

def OscValue = if close > close[1] then high else if close < close[1] then
low else (high + low)/2;

plot HurstOsc = if ((100 * OscValue/CMA) - 100) > 10 then 10
else if  ((100 * OscValue/CMA) - 100) < -10 then -10
else  ((100 * OscValue/CMA) - 100);

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
LowerExtremeBand.SetDefaultColor(GetColor(4));
LowerExtremeBand.SetLineWeight(1);

UpperOuterBand.SetDefaultColor(GetColor(5));
UpperOuterBand.SetLineWeight(1);
LowerOuterBand.SetDefaultColor(GetColor(6));
LowerOuterBand.SetLineWeight(1);

UpperInnerBand.SetDefaultColor(GetColor(1));
UpperInnerBand.SetLineWeight(1);
UpperInnerBand.SetStyle(Curve.SHORT_DASH);
LowerInnerBand.SetDefaultColor(GetColor(1));
LowerInnerBand.SetLineWeight(1);
LowerInnerBand.SetStyle(Curve.SHORT_DASH);

# Turn AddClouds off by putting a #-sign at the first position of the lines
AddCloud(UpperOuterBand, UpperInnerBand, color.red);
AddCloud(LowerInnerBand, LowerOuterBand, color.green);
