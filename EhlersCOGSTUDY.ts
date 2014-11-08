# EhlersCOG
# DREWGRIFFITH15 (C) 2014

declare lower;

input price = close;
input cutoffLength = 14;
input roofCutoffLength = 48;

assert(roofCutoffLength > 0, "roofCutoffLength must be positive: " + roofCutoffLength);

def alpha1 = (Cos(Sqrt(2) * Double.Pi / roofCutoffLength) + Sin (Sqrt(2) * Double.Pi / roofCutoffLength) - 1) / Cos(Sqrt(2) * Double.Pi / roofCutoffLength);
def highpass = if IsNaN(price + price[1] + price[2]) then highpass[1] else Sqr(1 - alpha1 / 2) * (price - 2 * price[1] + price[2]) + 2 * (1 - alpha1) * highpass[1] - Sqr(1 - alpha1) * highpass[2];
plot RoofingFilter = if !IsNaN(price) then reference EhlersSuperSmootherFilter(highpass, cutoffLength) else Double.NaN;
plot Lag = RoofingFilter[1];
plot Diff = RoofingFilter-Lag;

RoofingFilter.SetDefaultColor(GetColor(5));
Lag.SetDefaultColor(GetColor(7));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color("Positive and Up") else Diff.color("Positive and Down") else if Diff < Diff[1] then Diff.color("Negative and Down") else Diff.color("Negative and Up"));
