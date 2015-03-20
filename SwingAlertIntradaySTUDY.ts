# SwingAlertIntraday
# DREWGRIFFITH15 (C) 2015

declare upper;
input kperiod = 14;
input dperiod = 1;
input mwoversold = 20;
input rsi_length = 2;
input rsi_length2 = 14;
input RSIoversold = 5;
input cor_length = 60;
input div_filter = 12;
input price = close;

# Long positions only / Inputs based on 30 minute chart

# STOCHASTICSLOW
def FASTLINE = Round(StochasticSlow("k period" = kperiod, "d period" = dperiod), 0);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], rsi_length);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), rsi_length);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

# RSI Divergence
def rsi_sma = SimpleMovingAvg(reference RSI(length = rsi_length2), div_filter);
def cor = Correlation(close, rsi_sma, cor_length);

# RSI2 has to be oversold for at least two periods
# StochasticSlow must be under oversold
# RSI Divergence must be below 0

def BULLISH =
RSI[2] <= RSIoversold
and RSI[1] <= RSIoversold
and RSI > RSIoversold
and Lowest(FASTLINE, 3) <= mwoversold
and cor < 0;

plot BUY = BULLISH;

BUY.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BUY.AssignValueColor(Color.GREEN);
