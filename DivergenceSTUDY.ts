# DIVERGENCE
# DREWGRIFFITH15 (C) 2014

# Looking for negative correlation between price and RSI
declare lower;
input length = 20;
input filter = 5;
plot cor = Correlation(close, simplemovingAvg(rsiWilder(),filter), length);

cor.ASSIGNVALUECOLOR(IF cor <= 0 and cor < cor[1] and close >= close[length] THEN COLOR.RED ELSE IF cor <= 0 and cor < cor[1] and close < close[length] THEN COLOR.GREEN ELSE COLOR.GRAY);
