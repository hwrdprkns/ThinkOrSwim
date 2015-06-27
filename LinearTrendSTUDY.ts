# LinearTrend
# DREWGRIFFITH15 (C) 2015

declare upper;

# Daily settings

input price = close;
input length = 100;

plot inertia = inertiaAll(price,length);