input price = close;
input high = high;
input low = low;
input showPriceBubble = yes;
input onExpansion = Yes;
input Extend_to_left = no;
input Coefficient0 = 0.000;
input coefficient_1 = .236;
input Coefficient_2 = .382;
input Coefficient_3 = .500;
input Coefficient_4 = .618;
Input Coefficient_5 = .786;
input Coefficient_6 = 1.000;

  def a = HighestAll(high);
  def b = LowestAll(low);
  def barnumber = barNumber();
  def c = if high == a
          then barnumber
          else double.nan;
  def d = if low == b
          then barnumber
          else double.nan;
  rec highnumber = compoundValue(1, if IsNaN(c)
                                    then highnumber[1]
                                    else c, c);
  def highnumberall = HighestAll(highnumber);
  rec lownumber = compoundValue(1, if IsNaN(d)
                                   then lownumber[1]
                                   else d, d);
  def lownumberall = LowestAll(lownumber);
  def upward = highnumberall > lownumberall;
  def downward = highnumberall < lownumberall;
  def x = AbsValue(lownumberall - highnumberall );
  def slope = (a - b) / x;
  def slopelow = (b - a) / x;
  def day = getDay();
  def month = getMonth();
  def year = getYear();
  def lastDay = getLastDay();
  def lastmonth = getLastMonth();
  def lastyear = getLastYear();
  def isToday = if(day == lastDay and
                   month == lastmonth and
                   year == lastyear, 1, 0);
  def istodaybarnumber = HighestAll(if isToday
                                    then barnumber
                                    else double.nan);
  def line = b + (slope * (barnumber - lownumber));
  def linelow = a + (slopelow * (barnumber - highnumber));
  def currentlinelow = if barnumber <= lownumberall
                       then linelow
                       else double.nan;
  def currentline = if barnumber <= highnumberall
                  then line
                  else double.nan;

 Plot FibFan =  if downward
                 then currentlinelow
                 else if upward
                 then currentline
                 else double.nan;
      FibFan.SetStyle(Curve.SHORT_DASH);
      FibFan.AssignValueColor(color.red);
      Fibfan.hidebubble();

  def range =  a - b;

 Plot Retracement0 = if downward and
                        !onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall and
                        barnumber <= istodaybarnumber
                     then highestall((b + (range *  coefficient0)))
                     else if upward and
                             !extend_to_left and
                             !onexpansion and
                             barnumber >= lownumberall and
                             barnumber <= istodaybarnumber
                     then highestall(a - (range * coefficient0))
                     else if downward and
                             onexpansion and
                             !extend_to_left and
                             barnumber >= highnumberall
                     then highestall((b + (range *  coefficient0)))
                     else if upward and
                             onexpansion and
                             barnumber >= lownumberall and
                             !extend_to_left
                     then highestall(a - (range * coefficient0))
                     else if downward and
                             !onexpansion and
                             extend_to_left and
                             barnumber <= istodaybarnumber
                     then highestall((b + (range *  coefficient0)))
                     else if upward and
                             extend_to_left and
                             !onexpansion and
                             barnumber <= istodaybarnumber
                     then highestall(a - (range * coefficient0))
                     else if downward and
                             onexpansion and
                             extend_to_left
                     then highestall((b + (range *  coefficient0)))
                     else if upward and
                             onexpansion and
                             extend_to_left
                     then highestall(a - (range * coefficient0))
                     else double.nan;
      Retracement0.assignvaluecolor(color.red);
      Retracement0.hidebubble();
AddChartBubble((showPriceBubble == yes and barnumber == istodaybarnumber), retracement0, concat( "$", round(retracement0, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement0, concat( (coefficient0 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement0, concat( (coefficient0 * 100), "%"), color.red, yes);


 Plot Retracement1 =  if downward and
                         !onexpansion and
                         !extend_to_left and
                         barnumber >= highnumberall and
                         barnumber <= istodaybarnumber
                      then highestall((b + (range *  coefficient_1)))
                      else if upward and
                              !extend_to_left and
                              !onexpansion and
                              barnumber >= lownumberall and
                              barnumber <= istodaybarnumber
                      then highestall(a - (range * coefficient_1))
                      else if downward and
                              onexpansion and
                              !extend_to_left and
                              barnumber >= highnumberall
                      then highestall((b + (range *  coefficient_1)))
                      else if upward and
                              onexpansion and
                              barnumber >= lownumberall and
                              !extend_to_left
                       then highestall(a - (range * coefficient_1))
                       else if downward and
                               !onexpansion and
                               extend_to_left and
                               barnumber <= istodaybarnumber
                       then highestall((b + (range *  coefficient_1)))
                       else if upward and
                               extend_to_left and
                               !onexpansion and
                               barnumber <= istodaybarnumber
                       then highestall(a - (range * coefficient_1))
                       else if downward and
                               onexpansion and
                               extend_to_left
                       then highestall((b + (range *  coefficient_1)))
                       else if upward and
                               onexpansion and
                               extend_to_left
                       then highestall(a - (range * coefficient_1))
                       else double.nan;
      Retracement1.assignvaluecolor(color.red);
      Retracement1.hidebubble();
AddChartBubble((showPriceBubble == yes and barnumber == istodaybarnumber), retracement1, concat( "$", round(retracement1, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement1, concat( (coefficient_1 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement1, concat( (coefficient_1 * 100), "%"), color.red, yes);

  Plot Retracement2 = if downward and
                         !onexpansion and
                         !extend_to_left and
                         barnumber >= highnumberall and
                         barnumber <= istodaybarnumber
                      then highestall((b + (range *  coefficient_2)))
                      else if upward and
                         !extend_to_left and
                         !onexpansion and
                         barnumber >= lownumberall and barnumber <= istodaybarnumber
                      then highestall(a - (range * coefficient_2))
                      else if downward and
                         onexpansion and
                         !extend_to_left and
                         barnumber >= highnumberall
                      then highestall((b + (range *  coefficient_2)))
                      else if upward and
                         onexpansion and
                         barnumber >= lownumberall and
                         !extend_to_left
                      then highestall(a - (range * coefficient_2))
                      else if downward and
                         !onexpansion and
                         extend_to_left and
                         barnumber <= istodaybarnumber
                      then highestall((b + (range *  coefficient_2)))
                      else if upward and
                         extend_to_left and
                         !onexpansion and
                         barnumber <= istodaybarnumber
                      then highestall(a - (range * coefficient_2))
                      else if downward and
                         onexpansion and
                         extend_to_left
                      then highestall((b + (range *  coefficient_2)))
                      else if upward and
                         onexpansion and
                         extend_to_left
                      then highestall(a - (range * coefficient_2))
                      else double.nan;
       Retracement2.assignvaluecolor(color.red);
       Retracement2.hidebubble();
AddChartBubble((showPriceBubble == yes and barnumber == istodaybarnumber), retracement2, concat( "$", round(retracement2, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement2, concat( (coefficient_2 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement2, concat( (coefficient_2 * 100), "%"), color.red, yes);


 Plot Retracement3 = if downward and
                        !onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall and
                        barnumber <= istodaybarnumber
                     then highestall((b + (range *  coefficient_3)))
                     else if upward and
                        !extend_to_left and
                        !onexpansion and
                        barnumber >= lownumberall and
                        barnumber <= istodaybarnumber
                     then highestall(a - (range * coefficient_3))
                     else if downward and
                        onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall
                     then highestall((b + (range *  coefficient_3)))
                     else if upward and
                        onexpansion and
                        barnumber >= lownumberall and
                        !extend_to_left
                     then highestall(a - (range * coefficient_3))
                     else if downward and
                        !onexpansion and
                        extend_to_left and
                        barnumber <= istodaybarnumber
                     then highestall((b + (range *  coefficient_3)))
                     else if upward and
                        extend_to_left and
                        !onexpansion and
                        barnumber <= istodaybarnumber
                     then highestall(a - (range * coefficient_3))
                     else if downward and
                        onexpansion and
                        extend_to_left
                     then highestall((b + (range *  coefficient_3)))
                     else if upward and
                        onexpansion and
                        extend_to_left
                     then highestall(a - (range * coefficient_3))
                     else double.nan;
      Retracement3.assignvaluecolor(color.red);
      Retracement3.hidebubble();
AddChartBubble(( showPriceBubble == yes and barnumber == istodaybarnumber), retracement3, concat( "$", round(retracement3, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement3, concat( (coefficient_3 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement3, concat( (coefficient_3 * 100), "%"), color.red, yes);


 Plot Retracement4 = if downward and
                        !onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall and
                        barnumber <= istodaybarnumber
                    then highestall((b + (range *  coefficient_4)))
                    else if upward and
                        !extend_to_left and
                        !onexpansion and
                        barnumber >= lownumberall and
                        barnumber <= istodaybarnumber
                    then highestall(a - (range * coefficient_4))
                    else if downward and
                        onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall
                    then highestall((b + (range *  coefficient_4)))
                    else if upward and
                        onexpansion and
                        barnumber >= lownumberall and
                        !extend_to_left
                    then highestall(a - (range * coefficient_4))
                    else if downward and
                        !onexpansion and
                        extend_to_left and
                        barnumber <= istodaybarnumber
                    then highestall((b + (range *  coefficient_4)))
                    else if upward and
                        extend_to_left and
                        !onexpansion and
                        barnumber <= istodaybarnumber
                    then highestall(a - (range * coefficient_4))
                    else if downward and
                        onexpansion and
                        extend_to_left
                    then highestall((b + (range *  coefficient_4)))
                    else if upward and
                        onexpansion and
                        extend_to_left
                    then highestall(a - (range * coefficient_4))
                    else double.nan;
      Retracement4.assignvaluecolor(color.red);
      Retracement4.hidebubble();
AddChartBubble((showPriceBubble == yes and barnumber == istodaybarnumber), retracement4, concat( "$", round(retracement4, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement4, concat( (coefficient_4 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement4, concat( (coefficient_4 * 100), "%"), color.red, yes);

 Plot Retracement5 = if downward and
                        !onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall and
                        barnumber <= istodaybarnumber
                    then highestall((b + (range *  coefficient_5)))
                    else if upward and
                        !extend_to_left and
                        !onexpansion and
                        barnumber >= lownumberall and
                        barnumber <= istodaybarnumber
                    then highestall(a - (range * coefficient_5))
                    else if downward and
                         onexpansion and
                         !extend_to_left and
                         barnumber >= highnumberall
                then highestall((b + (range *  coefficient_5)))
                else if upward and
                         onexpansion and
                         barnumber >= lownumberall and
                         !extend_to_left
                then highestall(a - (range * coefficient_5))
                else if downward and
                    !onexpansion and
                    extend_to_left and
                    barnumber <= istodaybarnumber
                then highestall((b + (range *  coefficient_5)))
                else if upward and
                    extend_to_left and
                    !onexpansion and
                    barnumber <= istodaybarnumber
                then highestall(a - (range * coefficient_5))
                else if downward and
                    onexpansion and
                    extend_to_left
                then highestall((b + (range *  coefficient_5)))
                else if upward and
                    onexpansion and
                    extend_to_left
                then highestall(a - (range * coefficient_5))
                else double.nan;
      Retracement5.assignvaluecolor(color.red);
      Retracement5.hidebubble();
AddChartBubble((showPriceBubble == yes and barnumber == istodaybarnumber), retracement5, concat( "$", round(retracement5, 2)), color.red, yes);
AddChartBubble((downward and barnumber == highnumberall), retracement5, concat( (coefficient_5 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement5, concat( (coefficient_5 * 100), "%"), color.red, yes);


 Plot Retracement6 = if downward and
                        !onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall and
                        barnumber <= istodaybarnumber
                    then highestall((b + (range *  coefficient_6)))
                    else if upward and
                        !extend_to_left and
                        !onexpansion and barnumber >= lownumberall and
                        barnumber <= istodaybarnumber
                    then highestall(a - (range * coefficient_6))
                    else if downward and
                        onexpansion and
                        !extend_to_left and
                        barnumber >= highnumberall
                    then highestall((b + (range *  coefficient_6)))
                    else if upward and
                        onexpansion and
                        barnumber >= lownumberall and
                        !extend_to_left
                    then highestall(a - (range * coefficient_6))
                    else if downward and
                        !onexpansion and
                        extend_to_left and
                        barnumber <= istodaybarnumber
                    then highestall((b + (range *  coefficient_6)))
                    else if upward and
                        extend_to_left and
                        !onexpansion and
                        barnumber <= istodaybarnumber
                    then highestall(a - (range * coefficient_6))
                    else if downward and
                        onexpansion and extend_to_left
                    then highestall((b + (range *  coefficient_6)))
                    else if upward and onexpansion and
                        extend_to_left
                    then highestall(a - (range * coefficient_6))
                    else double.nan;
      Retracement6.assignvaluecolor(color.red);
      Retracement6.hidebubble();
AddChartBubble((showPriceBubble == yes and barnumber == istodaybarnumber), retracement6, concat( "$", round(retracement6, 2)), color.red, Yes);
AddChartBubble((downward and barnumber == highnumberall), retracement6, concat( (coefficient_6 * 100), "%"), color.red, yes);
AddChartBubble((upward and barnumber == lownumberall), retracement6, concat( (coefficient_6 * 100), "%"), color.red, yes);

alert((price crosses below Retracement0) , "Price crosses below Retracement Line 0");
alert((price crosses above Retracement0) , "Price crosses above Retracement Line 0");
alert((price crosses below Retracement1) , "Price crosses below Retracement Line 1");
alert((price crosses above Retracement1) , "Price crosses above Retracement Line 1");
alert((price crosses below Retracement2) , "Price crosses below Retracement Line 2");
alert((price crosses above Retracement2) , "Price crosses above Retracement Line 2");
alert((price crosses below Retracement3) , "Price crosses below Retracement Line 3");
alert((price crosses above Retracement3) , "Price crosses above Retracement Line 3");
alert((price crosses below Retracement4) , "Price crosses below Retracement Line 4");
alert((price crosses above Retracement4) , "Price crosses above Retracement Line 4");
alert((price crosses below Retracement5) , "Price crosses below Retracement Line 5");
alert((price crosses above Retracement5) , "Price crosses above Retracement Line 5");
alert((price crosses below Retracement6) , "Price crosses below Retracement Line 6");
alert((price crosses above Retracement6) , "Price crosses above Retracement Line 6");

# Fibonacci Time Series
   rec bar1 = if lownumber == barnumber()
              then barnumber()
              else bar1[1];
   rec bars = if barnumber()[1] == bar1[1]
              then 2
              else if barnumber[1] > bar1[1]
              then bars[1] + 1
              else 0;
   def coeff = Sqrt(5);
   def smallest = 5;
   def n = Floor(log(bars * coeff + 0.5) / log((1 + Sqrt(5)) / 2));
   def inSeries = n != n[1] and bars >= smallest;
   def Series = if inSeries
                then bars
                else Double.NaN;
   AddVerticalLine(Series, "FTS: ( " + Series + ")", Color.Blue, Curve.Short_Dash);
