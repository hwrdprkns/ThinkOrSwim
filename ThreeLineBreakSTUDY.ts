# THREELINEBREAK
# WGRIFFITH2 (C) 2014

## NOT IN PRODUCTION ##

DEF state = {default barOne, barTwo, barThree};
DEF xHigh;
DEF xLow;
DEF xWhite;
switch ( state[1] ) {
case barOne:
    state    = state.barTwo;
    xHigh    = close;
    xLow     = close;
    xWhite   = if close > open then yes else no;
case barTwo:
    state = state.barThree;
    if close > xHigh[1]
    then {
        xHigh  = close;
        xLow   = xHigh[1];
        xWhite = yes;
    } else if close < xLow[1]
    then {
        xHigh  = xLow[1];
        xLow   = close;
        xWhite = no;
    } else {
        xHigh  = xHigh[1];
        xLow   = xLow[1];
        xWhite = xWhite[1];
    }
case barThree:
    state = state.barThree;
    if close > Max(xHigh[1], xHigh[2])
    then {
        xHigh  = high;
        xLow   = xHigh[1];
        xWhite = yes;
    } else if close < Min(xLow[1], xLow[2])
    then {
        xHigh  = xLow[1];
        xLow   = low;
        xWhite = no;
    } else {
        xHigh  = xHigh[1];
        xLow   = xLow[1];
        xWhite = xWhite[1];
    }
}
DefineGlobalColor( "3LBH", Color.WHITE );
DefineGlobalColor( "3LBL", Color.DARK_RED );
plot TLB_High  = if IsNaN(close) then Double.NaN else if xWhite then xHigh else xLow;
TLB_High.SetPaintingStrategy( PaintingStrategy.DASHES );
TLB_High.AssignValueColor( if xWhite then GlobalColor("3LBH") else GlobalColor("3LBL"));
plot TLB_Low = if IsNaN(close) then Double.NaN else if xWhite then xLow else xHigh;
TLB_Low.SetPaintingStrategy( PaintingStrategy.DASHES );
TLB_Low.AssignValueColor( if xWhite then GlobalColor("3LBH") else GlobalColor("3LBL"));
AddCloud( TLB_High, TLB_Low, color1 = Color.WHITE );
plot P = close;
P.SetPaintingStrategy( PaintingStrategy.POINTS );
P.Hide();
