# SwingTraderShortEntry
# DREWGRIFFITH15 (C) 2015

# Daily settings

input dollar_amt = 5000;
input RSI_Target = 25;
input price = close;
input rsi_length = 2;
input rsi_ob = 95;
input rsi_os = 5;
input kperiod = 5;
input COGlength = 10;
input ExtremeValue = 1.6;

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;
def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

def HurstOsc = if ((100 * price/CMA) - 100) > ExtremeValue then ExtremeValue
else if ((100 * price/CMA) - 100) < -ExtremeValue then -ExtremeValue
else ((100 * price/CMA) - 100);

# Stochastic
def MoneyWave = StochasticFull("k period" = 5);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

plot BEARISH = MoneyWave >= 80 and RSI >= RSI_ob and HurstOsc >= ExtremeValue
and close <= MovAvgExponential(length = 300);

def target = RSI <= RSI_Target;

DEF SHARES = ROUND(dollar_amt / CLOSE);

ADDORDER(condition = BEARISH is true, TRADESIZE = SHARES, TICKCOLOR = GetColor(0), ARROWCOLOR = GetColor(0), NAME = "SE", price = close()[0], type = OrderType.SELL_TO_OPEN);
ADDORDER(OrderType.BUY_TO_CLOSE, target IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "SX", PRICE = Close());

##################################################
