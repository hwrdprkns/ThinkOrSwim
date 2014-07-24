# DARVASBOX
# DREWGRIFFITH15 (C) 2014

def state = {default state_1, state_2, state_3, state_4, state_5};

def upper;
def lower;

def prevLower = CompoundValue(1, lower[1], low);
def prevUpper = CompoundValue(1, upper[1], high);

switch (state[1]) {
case state_1:
    lower = low;
    if (prevUpper >= high) {
        upper = high[1];
        state = state.state_2;
    } else {
        upper = high;
        state = state.state_1;
    }
case state_2:
    if (prevUpper >= high) {
        lower = low;
        upper = prevUpper;
        state = state.state_3;
    } else {
        lower = low;
        upper = high;
        state = state.state_1;
    }
case state_3:
    if (prevUpper < high) {
        lower = low;
        upper = high;
        state = state.state_1;
    } else if (prevLower > low) {
        lower = low;
        upper = prevUpper;
        state = state.state_3;
    } else {
        lower = prevLower;
        upper = prevUpper;
        state = state.state_4;
    }
case state_4:
    if (prevUpper < high) {
        lower = low;
        upper = high;
        state = state.state_1;
    } else if (prevLower > low) {
        lower = low;
        upper = prevUpper;
        state = state.state_3;
    } else {
        lower = prevLower;
        upper = prevUpper;
        state = state.state_5;
    }
case state_5:
    if (prevUpper < high) {
        lower = low;
        upper = high;
        state = state.state_1;
    } else if (prevLower > low) {
        lower = low;
        upper = high;
        state = state.state_1;
    } else {
        lower = prevLower;
        upper = prevUpper;
        state = state.state_5;
    }
}

def barNumber = BarNumber();
def barCount = HighestAll(If(IsNaN(close), 0, barNumber));
def boxNum;
def boxUpperIndex;

plot "Upper Band";
plot "Lower Band";
plot "Buy Signal" = CompoundValue(1, state[1] == state.state_5 and prevUpper < close, no);
plot "Sell Signal" = CompoundValue(1, state[1] == state.state_5 and prevLower > close, no);
plot "Rating" = if CompoundValue(1, state[1] == state.state_5 and prevUpper < close, no) then 2
                else if CompoundValue(1, state[1] == state.state_5 and prevLower > close, no) then 1
                else 0;

if (IsNaN(close)) {
    boxNum = boxNum[1] + 1;
    boxUpperIndex = 0;
    "Upper Band" = Double.NaN;
    "Lower Band" = Double.NaN;
} else {
    boxNum = TotalSum("Buy Signal" or "Sell Signal");
    boxUpperIndex = fold indx = 0 to barCount - barNumber + 2 with valInd = Double.NaN
        while IsNaN(valInd)
        do if (GetValue(boxNum, -indx) != boxNum)
            then indx
            else Double.NaN;
    "Upper Band" = GetValue(upper, -boxUpperIndex + 1);
    "Lower Band" = GetValue(lower, -boxUpperIndex + 1);
}

"Upper Band".SetDefaultColor(Color.GREEN);
"Lower Band".SetDefaultColor(Color.RED);
"Sell Signal".SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
"Sell Signal".SetDefaultColor(Color.RED);
"Buy Signal".SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
"Buy Signal".SetDefaultColor(Color.GREEN);
"Rating".hide();
"Rating".HideBubble();
