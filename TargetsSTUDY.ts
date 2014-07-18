# TARGETS
# WGRIFFITH2 (C) 2014

INPUT TARGET_ONE = 20; #35
INPUT TARGET_TWO = 40; #140
INPUT TARGET_THR = 252; #280

# PLOT HIGH TARGETS
PLOT HIGH_ONE = if getLastDay() == getDay() then HIGHEST(DATA = HIGH(), LENGTH = TARGET_ONE)[1]
else Double.NaN;
PLOT HIGH_TWO = if getLastDay() == getDay() then HIGHEST(DATA = HIGH(), LENGTH = TARGET_TWO)[1]
else Double.NaN;
PLOT HIGH_THR = if getLastDay() == getDay() then HIGHEST(DATA = HIGH(), LENGTH = TARGET_THR)[1]
else Double.NaN;

# PLOT LOW TARGETS
PLOT LOW_ONE = if getLastDay() == getDay() then LOWEST(DATA = LOW(), LENGTH = TARGET_ONE)[1]
else Double.NaN;
PLOT LOW_TWO = if getLastDay() == getDay() then LOWEST(DATA = LOW(), LENGTH = TARGET_TWO)[1]
else Double.NaN;
PLOT LOW_THR = if getLastDay() == getDay() then LOWEST(DATA = LOW(), LENGTH = TARGET_THR)[1]
else Double.NaN;

HIGH_ONE.SetDefaultColor(CreateColor(255, 255, 255));
HIGH_ONE.SetPaintingStrategy(PaintingStrategy.POINTS);
HIGH_TWO.SetDefaultColor(CreateColor(255, 255, 255));
HIGH_TWO.SetPaintingStrategy(PaintingStrategy.POINTS);
HIGH_THR.SetDefaultColor(CreateColor(255, 255, 255));
HIGH_THR.SetPaintingStrategy(PaintingStrategy.POINTS);

LOW_ONE.SetDefaultColor(CreateColor(255, 255, 255));
LOW_ONE.SetPaintingStrategy(PaintingStrategy.POINTS);
LOW_TWO.SetDefaultColor(CreateColor(255, 255, 255));
LOW_TWO.SetPaintingStrategy(PaintingStrategy.POINTS);
LOW_THR.SetDefaultColor(CreateColor(255, 255, 255));
LOW_THR.SetPaintingStrategy(PaintingStrategy.POINTS);

##############################################
