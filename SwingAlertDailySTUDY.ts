# SwingAlertDaily
# DREWGRIFFITH15 (C) 2014

declare upper;
def SLOWK = 14;
def SLOWD = 1;
def overbought = 80;
def oversold = 20;
def RSI_LENGTH = 14;
def SR_LENGTH = 40;
def SMA_LENGTH = 10;
def TRAIL = 2;
def DISPLACE = 1;
def AGGREGATIONPERIOD = AGGREGATIONPERIOD.DAY;

# STOCHASTICSLOW
def FASTLINE = StochasticSlow("k period" = SLOWK, "d period" = SLOWD);

# RSI
def NETCHGAVG = WildersAverage(close - close[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(close - close[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);
def RSI_SMA = Round(SimpleMovingAvg(PRICE = RSI, LENGTH = SMA_LENGTH), 0);

def NEW_HIGH = CLOSE > HIGHEST(HIGH(PERIOD = AGGREGATIONPERIOD), TRAIL)[DISPLACE];

def GreenPrice =
NEW_HIGH
and RSI > RSI_SMA
and FASTLINE > FASTLINE[1]
and (lowest(FASTLINE,2)[1] <= oversold);

plot BULLISH =
GreenPrice and !GreenPrice[1];

BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BULLISH.AssignValueColor(Color.GREEN);
