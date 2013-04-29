##############ATR2_Target#############
# WGRIFFITH2 (c) 2013

input factor = 2;
def target = close + atrWilder()*factor;

plot plot_target = target;

plot_target.SetDefaultColor(Color.UPTICK);
plot_target.SetPaintingStrategy(PaintingStrategy.POINTS);

#####################################