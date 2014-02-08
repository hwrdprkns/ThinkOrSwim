# ReverseEngineeredRSI
# WGRIFFITH2 (C) 2014

declare upper;

input UpperLength = 42;

def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);
def chg = close - close[1];

# RSI Resistance
def rsiValueUpper = round(HIGHEST(RSI,LENGTH=UpperLength), numberOfDigits = 0);
def UpperCoeff = rsiValueUpper / (100 - rsiValueUpper);
def UpperDiff =  (14 - 1) * (WildersAverage(Max(-chg, 0), 14) * UpperCoeff - WildersAverage(Max(chg, 0), 14));
def UpperValue = close + if UpperDiff >= 0 then UpperDiff else UpperDiff / UpperCoeff;

plot UpperRevEngRSI = compoundValue(1, UpperValue[1], Double.NaN);

UpperRevEngRSI.SETDEFAULTCOLOR(CREATECOLOR(11, 0, 78));