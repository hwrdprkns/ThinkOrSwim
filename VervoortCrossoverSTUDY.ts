# VervoortCrossover
# (c) 2009 http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 30 MAR 2009

input period = 55;
def price = (high+low+close)/3;

#-----Typical Price ZeroLag Triple Exponential Moving Average

def TMA1 = 3*expAverage(price,period)
-3*expAverage(expAverage(price,period),period)
+expAverage(expAverage(expAverage(price,period)
,period),period);

def TMA2 = 3*expAverage(TMA1,period)
-3*expAverage(expAverage(TMA1,period),period)
+expAverage(expAverage(expAverage(TMA1,period)
,period),period);

def difference = TMA1-TMA2;
plot TypicalPriceZeroLagTEMA = TMA1+difference;
TypicalPriceZeroLagTEMA.setDefaultColor(color.green);

#------Heikin-Ashi Close ZeroLag Triple Exponential Moving Average

rec haopen = CompoundValue(1,((open[1]+high[1]
+low[1]+close[1])/4 + haopen[1])/2, hl2);
def haclose = ((open+high+low+close)/4+haopen
+max(high,haopen)+min(low,haopen))/4;

def HATMA1 = 3*expAverage(haclose,period)
-3*expAverage(expAverage(haclose,period),period)
+expAverage(expAverage(expAverage(haclose,period)
,period),period);

def HATMA2 = 3 * ExpAverage(HATMA1, period)
- 3 * ExpAverage(ExpAverage(HATMA1, period), period)
+ ExpAverage(ExpAverage(ExpAverage(HATMA1, period)
, period), period);

def HAdifference = HATMA1 - HATMA2;

plot HeikinAshiZeroLagTEMA = HATMA1 + HAdifference;
HeikinAshiZeroLagTEMA.setDefaultColor(color.red);

def buySignal = if TypicalPriceZeroLagTEMA > HeikinAshiZeroLagTEMA and TypicalPriceZeroLagTEMA[1] <= HeikinAshiZeroLagTEMA[1] then 1 else 0;

def sellSignal = if TypicalPriceZeroLagTEMA < HeikinAshiZeroLagTEMA and TypicalPriceZeroLagTEMA[1] >= HeikinAshiZeroLagTEMA[1] then 1 else 0;

plot signal = if buySignal or sellSignal then TypicalPriceZeroLagTEMA else double.nan;
#signal.assignValueColor(if buySignal then color.green else color.red);
signal.setLineWeight(5);
signal.SetStyle(curve.points);
