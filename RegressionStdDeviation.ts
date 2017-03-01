# RegressionStdDeviation
# DREWGRIFFITH15 (C) 2015

declare upper;

input price = close;
input deviations = 1.50;
input fullRange = No;
input length = 200;

def regression;
def stdDeviation;
if (fullRange) {
    regression = InertiaAll(price);
    stdDeviation = StDevAll(price);
} else {
    regression = InertiaAll(price, length);
    stdDeviation = StDevAll(price, length);
}

plot UpperLine = regression + deviations * stdDeviation;
plot MiddleLine = regression;
MiddleLine.Hide();
plot LowerLine = regression - deviations * stdDeviation;

UpperLine.SetDefaultColor(Color.DARK_RED);
MiddleLine.SetDefaultColor(Color.DARK_GRAY);
LowerLine.SetDefaultColor(Color.DARK_RED);
UpperLine.SetLineWeight(3);
MiddleLine.SetLineWeight(1);
LowerLine.SetLineWeight(3);
