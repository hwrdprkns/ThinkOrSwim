# ReverseEngineeredRSI
# DREWGRIFFITH15 (C) 2014

declare upper;

input rsi_length = 14;
input rsi_sr = 20;

def NetChgAvg = WildersAverage(close - close[1], rsi_length);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), rsi_length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);
def chg = close - close[1];

# RSI Resistance
def rsiValueUpper = round(HIGHEST(RSI,LENGTH=rsi_sr), numberOfDigits = 0);
def UpperCoeff = rsiValueUpper / (100 - rsiValueUpper);
def UpperDiff =  (rsi_length - 1) * (WildersAverage(Max(-chg, 0), rsi_length) * UpperCoeff - WildersAverage(Max(chg, 0), rsi_length));
def UpperValue = close + if UpperDiff >= 0 then UpperDiff else UpperDiff / UpperCoeff;

# RSI Support
def rsiValueLower = round(Lowest(RSI,LENGTH=rsi_sr), numberOfDigits = 0);
def LowerCoeff = rsiValueLower / (100 - rsiValueLower);
def LowerDiff =  (rsi_length - 1) * (WildersAverage(Max(-chg, 0), rsi_length) * LowerCoeff - WildersAverage(Max(chg, 0), rsi_length));
def LowerValue = close + if LowerDiff >= 0 then LowerDiff else LowerDiff / LowerCoeff;

plot UpperRevEngRSI = compoundValue(1, UpperValue[1], Double.NaN);
UpperRevEngRSI.SETDEFAULTCOLOR(CREATECOLOR(11, 0, 78));
plot LowerRevEngRSI = compoundValue(1, LowerValue[1], Double.NaN);
LowerRevEngRSI.SETDEFAULTCOLOR(CREATECOLOR(11, 0, 78));
