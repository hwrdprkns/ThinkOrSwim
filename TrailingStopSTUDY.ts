# TRAILINGSTOP
# WGRIFFITH2 (C) 2014

INPUT PERIODS = 3;
INPUT SIDE = {DEFAULT LONG, SHORT};

PLOT STOP;
SWITCH (SIDE) {
CASE SHORT:
    STOP = Close > HIGHEST(DATA = HIGH(), LENGTH = PERIODS)[1];
CASE LONG:
    STOP = close < LOWEST(DATA = LOW(), LENGTH = PERIODS)[1];
}

STOP.SetDefaultColor(CreateColor(255, 0, 0));
STOP.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

##############################################