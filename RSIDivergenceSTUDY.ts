# RSIDIVERGENCE
# DREWGRIFFITH15 (C) 2014

# Looking for negative correlation between price and RSI
declare lower;
input length = 20;
input filter = 5;

def rsi_sma = simplemovingAvg(rsiWilder(),filter);

plot cor = Correlation(close, rsi_sma, length);

cor.ASSIGNVALUECOLOR(IF cor <= 0 THEN COLOR.Yellow ELSE COLOR.GRAY);
