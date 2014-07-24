# THREELINEBREAK
# DREWGRIFFITH15 (C) 2014

## NOT IN PRODUCTION ##

def FirstLineHigh = if close[2] > close[3] then close[2] else close[3];

def FirstLineLow = if close[2] < close[3] then close[2] else close[3];

def SecondLineHigh = if close[1] > FirstLineHigh then close[1] # new high
                     else FirstLineHigh; # stays the same

def SecondLineLow = if close[1] < FirstLineLow then close[1] # new low
                    else FirstLineLow; # stays the same

def ThirdLineHigh = if close[0] > max(FirstLineHigh,SecondLineHigh) then close[0] # new high
                    else if close[0] < min(FirstLineLow,SecondLineLow) then SecondLineHigh # prev high becomes low
                    else SecondLineHigh; # stays the same

def ThirdLineLow = if close[0] < min(FirstLineLow,SecondLineLow) then close[0] # new low
                   else if close[0] > max(FirstLineHigh,SecondLineHigh) then SecondLineLow # prev low becomes high
                   else SecondLineLow; # stays the same

def tlbH = if ThirdLineHigh > max(ThirdLineHigh[1],ThirdLineHigh[2]) then ThirdLineHigh
           else ThirdLineHigh[1];

def tblL = if ThirdLineLow < min(ThirdLineLow[1],ThirdLineLow[2]) then ThirdLineLow
           else ThirdLineLow[1];

def isWhite = if ThirdLineHigh > max(ThirdLineHigh[1],ThirdLineHigh[2]) then yes
             else if ThirdLineLow < min(ThirdLineLow[1],ThirdLineLow[2]) then no
             else isWhite[1];

DefineGlobalColor( "3LBH", Color.WHITE );
DefineGlobalColor( "3LBL", Color.DARK_RED );
plot TLB_High = tlbH;
TLB_High.SetPaintingStrategy( PaintingStrategy.BOOLEAN_POINTS );
TLB_High.AssignValueColor( if isWhite then GlobalColor("3LBH") else GlobalColor("3LBL"));
plot TLB_Low = tblL;
TLB_Low.SetPaintingStrategy( PaintingStrategy.BOOLEAN_POINTS );
TLB_Low.AssignValueColor( if isWhite then GlobalColor("3LBH") else GlobalColor("3LBL"));
#AddCloud( TLB_High, TLB_Low, color1 = Color.WHITE, COLOR2 = COLOR.RED );
plot P = close;
P.SetPaintingStrategy( PaintingStrategy.POINTS );
P.Hide();
