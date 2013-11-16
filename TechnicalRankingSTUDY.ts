# TECHNICALRANKING
# WGRIFFITH2 (C) 2013

DEF STO = 100 - ROUND(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, 14)) / (HIGHEST(HIGH, 14) - LOWEST(LOW, 14))), LENGTH = 3));

DEF RSI = 100 - RSIWILDER();

DEF PVR = if close > close[1] then 
              if volume > volume[1] then 
                 100
              else 
                 if volume < volume[1] then 
                    50
                 else 
                    0 
           else 
              0 + if close < close[1] then 
              if volume < volume[1] then 
                 0 
              else 
                 if volume > volume[1] then 
                    0 
                 else 
                    0 
           else 
              0
;

DEF ADX = ADX(7);

DEF TOT = STO+RSI+PVR+ADX;

PLOT TOTAL = TOT;

#########################################