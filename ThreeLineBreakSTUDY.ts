#hint: <b>Three-Line Break</b>
# code by rhouser@...

declare lower;

rec state = {default barOne, barTwo, barThree};
rec xHigh;
rec xLow;
rec xWhite;
switch ( state[1] ) {
  case barOne:
    state    = state.barTwo;
    xHigh    = high;
    xLow     = low;
    xWhite   = if close > open then yes else no;
  case barTwo:
    state = state.barThree;
    if high > xHigh[1] then {
      xHigh  = high;
      xLow   = xHigh[1];
      xWhite = yes;
    } else if low < xLow[1] then {
      xHigh  = xLow[1];
      xLow   = low;
      xWhite = no;
    } else {
      xHigh  = xHigh[1];
      xLow   = xLow[1];
      xWhite = xWhite[1];
    }
  case barThree:
    state = state.barThree;
    if high > Max(xHigh[1],xHigh[2]) then {
      xHigh  = high;
      xLow   = xHigh[1];
      xWhite = yes;
    } else if low < Min(xLow[1],xLow[2]) then {
      xHigh  = xLow[1];
      xLow   = low;
      xWhite = no;
    } else {
      xHigh  = xHigh[1];
      xLow   = xLow[1];
      xWhite = xWhite[1];
    }
}

DefineGlobalColor( "white", Color.WHITE );
DefineGlobalColor( "black", Color.RED );
plot TLB_High  = if IsNaN(close) then Double.NaN else if xWhite then xHigh else xLow;
TLB_High.SetPaintingStrategy( PaintingStrategy.DASHES );
TLB_High.AssignValueColor( if xWhite then globalColor("white") else globalColor("black"));
plot TLB_Low = if IsNaN(close) then Double.NaN else if xWhite then xLow else xHigh;
TLB_Low.SetPaintingStrategy( PaintingStrategy.DASHES );
TLB_Low.AssignValueColor( if xWhite then globalColor("white") else globalColor("black"));

#AddCloud( TLB_High, TLB_Low, globalColor("white"), globalColor("black") );

plot P = close;
P.SetPaintingStrategy( PaintingStrategy.POINTS );
P.Hide();
