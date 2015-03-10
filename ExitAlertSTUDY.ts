# EXITALERT
# DREWGRIFFITH15 (C) 2015

input rsi_length = 2;
input target = 75;
input price = close;

# On a buy, 30% profit target will be set by default.
# Otherwise, RSI2 will be used to determine exit.
# Even on a loss, the RSI2 >= 75 typically indicates a lower high sell point.
# I see this as selling at a high for a stop loss.

# RSI
def NETCHGAVG = WildersAverage(price - price[1], rsi_length);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), rsi_length);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

PLOT EXIT = RSI >= TARGET;
EXIT.SETDEFAULTCOLOR(CREATECOLOR(255, 255, 255));
EXIT.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_DOWN);
