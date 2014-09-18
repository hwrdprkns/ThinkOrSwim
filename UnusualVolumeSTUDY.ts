# UNUSUALVOLUME
# DREWGRIFFITH15 (C) 2014

input price = volume;
input choice = {default increased, decreased};
input percent = 10;
input length = 50;
def avg = average(price, length)[1];
def chg = 100 * (price/avg -1);
plot scan;

switch (choice) {
case increased:
    scan = chg >= percent;
case decreased:
    scan = chg <= -percent;
}
