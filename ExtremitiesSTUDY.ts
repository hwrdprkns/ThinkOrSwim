# Extremities

declare lower;

input length = 1;
input price = close;

assert(length > 0, "'length' must be positive: " + length);

plot PercentChgHi = 100 * (high / price - 1);
plot PercentChgLo = 100 * (low / price - 1);
