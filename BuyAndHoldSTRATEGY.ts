# BUYANDHOLD
# WGRIFFITH2 (C) 2014

input price = close;
input month_entry = 6;
input month_exit = 7;

AddOrder(OrderType.BUY_AUTO, GetMonth() == month_entry and price > Average(price, 50), tickColor = GetColor(1), arrowColor = GetColor(1), name = "LE");
AddOrder(OrderType.SELL_TO_CLOSE, GetMonth() == month_exit, tickColor = GetColor(2), arrowColor = GetColor(2), name = "LX");
