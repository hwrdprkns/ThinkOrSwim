# EXITALERT
# WGRIFFITH2 (C) 2014

INPUT SIDE = {default LONG, SHORT};
INPUT TARGET = 20;
INPUT TRAIL = 3;

def STOP;
switch (SIDE) {
case LONG:
    STOP = LOW <= LOWEST(DATA = LOW, LENGTH = TRAIL-1)[1];
case SHORT:
    STOP = HIGH >= HIGHEST(DATA = HIGH, LENGTH = TRAIL-1)[1];
}

def LMT;
switch (SIDE) {
case LONG:
    LMT = HIGH >= HIGHEST(DATA = HIGH, LENGTH = TARGET-1)[1];
case SHORT:
    LMT = LOW <= LOWEST(DATA = LOW, LENGTH = TARGET-1)[1];
}

plot EXIT = STOP OR LMT;
EXIT.SetDefaultColor(CreateColor(255, 255, 255));
EXIT.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
