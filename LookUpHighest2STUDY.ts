############LookUpHighest2##############
# wgriffith2 2013
#

input price = high;
input lookUpPrice = high;
input length = 60;
input offset = 1;

plot Value = getValue(price, getMaxValueOffset(lookUpPrice, length), length)[offset];
Value.setDefaultColor(GetColor(1));

############################################