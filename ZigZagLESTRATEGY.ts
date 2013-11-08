input priceH = close;
input priceL = close;
input percentageReversal = 1.0;
input absoluteReversal = 0.0;
input atrLength = 5;
input atrReversal = 1.5;

Assert(percentageReversal >= 0, "'percentage reversal' must not be negative: " + percentageReversal);
Assert(absoluteReversal >= 0, "'absolute reversal' must not be negative: " + absoluteReversal);
Assert(atrReversal >= 0, "'atr reversal' must not be negative: " + atrReversal);
Assert(percentageReversal != 0 or absoluteReversal != 0 or atrReversal != 0, "Either 'percentage reversal' or 'absolute reversal' or 'atr reversal' must not be zero");

def hlPivot;
if (atrReversal != 0) {
    hlPivot = percentageReversal / 100 + ATRWilder(atrLength) / close * atrReversal;
} else {
    hlPivot = percentageReversal / 100;
}
def state = {default init, undefined, uptrend, downtrend};
def maxPriceH;
def minPriceL;
def newMax;
def newMin;
def prevMaxH = GetValue(maxPriceH, 1);
def prevMinL = GetValue(minPriceL, 1);

if GetValue(state, 1) == GetValue(state.init, 0) {
    maxPriceH = priceH;
    minPriceL = priceL;
    newMax = yes;
    newMin = yes;
    state = state.undefined;
} else if GetValue(state, 1) == GetValue(state.undefined, 0) {
    if priceH >= prevMaxH {
        state = state.uptrend;
        maxPriceH = priceH;
        minPriceL = prevMinL;
        newMax = yes;
        newMin = no;
    } else if priceL <= prevMinL {
        state = state.downtrend;
        maxPriceH = prevMaxH;
        minPriceL = priceL;
        newMax = no;
        newMin = yes;
    } else {
        state = state.undefined;
        maxPriceH = prevMaxH;
        minPriceL = prevMinL;
        newMax = no;
        newMin = no;
    }
} else if GetValue(state, 1) == GetValue(state.uptrend, 0) {
    if priceL <= prevMaxH - prevMaxH * hlPivot - absoluteReversal {
        state = state.downtrend;
        maxPriceH = prevMaxH;
        minPriceL = priceL;
        newMax = no;
        newMin = yes;
    } else {
        state = state.uptrend;
        if (priceH >= prevMaxH) {
            maxPriceH = priceH;
            newMax = yes;
        } else {
            maxPriceH = prevMaxH;
            newMax = no;
        }
        minPriceL = prevMinL;
        newMin = no;
    }
} else {
    if priceH >= prevMinL + prevMinL * hlPivot + absoluteReversal {
        state = state.uptrend;
        maxPriceH = priceH;
        minPriceL = prevMinL;
        newMax = yes;
        newMin = no;
    } else {
        state = state.downtrend;
        maxPriceH = prevMaxH;
        newMax = no;
        if (priceL <= prevMinL) {
            minPriceL = priceL;
            newMin = yes;
        } else {
            minPriceL = prevMinL;
            newMin = no;
        }
    }
}

def barNumber = BarNumber();
def barCount = HighestAll(If(IsNaN(priceH), 0, barNumber));
def newState = GetValue(state, 0) != GetValue(state, 1);
def offset = barCount - barNumber + 1;
def highPoint = state == state.uptrend and priceH == maxPriceH;
def lowPoint = state == state.downtrend and priceL == minPriceL;

def lastH;
if highPoint and offset > 1 {
    lastH = fold iH = 1 to offset with tH = priceH while !IsNaN(tH) and !GetValue(newState, -iH) do if GetValue(newMax, -iH) or iH == offset - 1 and GetValue(priceH, -iH) == tH then Double.NaN else tH;
} else {
    lastH = Double.NaN;
}

def lastL;
if lowPoint and offset > 1 {
    lastL = fold iL = 1 to offset with tL = priceL while !IsNaN(tL) and !GetValue(newState, -iL) do if GetValue(newMin, -iL) or iL == offset - 1 and GetValue(priceL, -iL) == tL then Double.NaN else tL;
} else {
    lastL = Double.NaN;
}
DEF SHARES = ROUND(12000 / CLOSE);

#LONG POSITION:
ADDORDER(ORDERTYPE.BUY_TO_OPEN, lastL == priceL, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "ZZ_LE");
addOrder(OrderType.SELL_TO_CLOSE, lastH == priceH, TRADESIZE = SHARES, tickColor = GetColor(6), arrowColor = GetColor(6), NAME = "ZZ_LX");