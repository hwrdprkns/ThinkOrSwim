# DoubleStochastic
# WGRIFFITH2 (C) 2014

declare lower;

INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT over_bought = 80;
INPUT over_sold = 20;

PLOT FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
PLOT SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;
PLOT STOCHASTIC_SMA = SIMPLEMOVINGAVG(FASTLINE,12);

SLOWLINE.setDefaultColor(color.magenta);
FASTLINE.setDefaultColor(color.magenta);
FASTLINE.SetLineWeight(3);
STOCHASTIC_SMA.setDefaultColor(color.CYAN);

plot OverBought = over_bought;
OverBought.setDefaultColor(color.DARK_GRAY);

plot OverSold = over_sold;
OverSold.setDefaultColor(color.DARK_GRAY);

SLOWLINE.AssignValueColor(if SLOWLINE < FASTLINE and SLOWLINE > STOCHASTIC_SMA then color.green
                          else if SLOWLINE > FASTLINE and SLOWLINE < STOCHASTIC_SMA then color.red else color.magenta);
FASTLINE.AssignValueColor(if SLOWLINE < FASTLINE and FASTLINE > STOCHASTIC_SMA then color.green
                          else if SLOWLINE > FASTLINE and FASTLINE < STOCHASTIC_SMA then color.red else color.magenta);
STOCHASTIC_SMA.AssignValueColor(if FASTLINE > STOCHASTIC_SMA then color.green
                          else if FASTLINE < STOCHASTIC_SMA then color.red else color.CYAN);
