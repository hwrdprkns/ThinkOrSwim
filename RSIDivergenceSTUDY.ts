# RSIDIVERGENCE
# DREWGRIFFITH15 (C) 2015

# Looking for negative correlation between price and RSI
# inputs based on 30 minute chart
declare lower;
input RSI_length = 14;
input cor_length = 60;
input div_filter = 12;

# RSI Divergence
def rsi_sma = SimpleMovingAvg(reference RSI(length = RSI_length), div_filter);
plot cor = Correlation(close, rsi_sma, cor_length);

cor.AssignValueColor(if cor <= 0 then Color.YELLOW else Color.GRAY);
