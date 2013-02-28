#http://www.candlesticker.com/Bearish.asp
#http://www.candlesticker.com/Bullish.asp
##################################################################
#CANDLESTICKER-BEARISH-HIGH1
#HIGH RELIABILITY
darkCloudCover() or kicking().bearish or abandonedBaby().bearish or eveningStar() or eveningDojiStar()
##################################################################
#CANDLESTICKER-BEARISH-HIGH2
#HIGH RELIABILITY
threeblackCrows() or threeinsideDown() or threeoutsideDown() or upsideGapTwoCrows()
##################################################################
#CANDLESTICKER-BEARISH-MED1
#MED RELIABILITY
engulfing().bearish or haramiCross().bearish or advanceBlock() or deliberation()
##################################################################
#CANDLESTICKER-BULLISH-HIGH1
#HIGH RELIABILITY
piercingLine() or kicking().bullish or abandonedBaby() or morningDojiStar() or morningStar()
##################################################################
#CANDLESTICKER-BULLISH-HIGH1
#HIGH RELIABILITY
threeinsideUp() or threeoutsideUp() or threewhiteSoldiers()
##################################################################
#CANDLESTICKER-BULLISH-MED1
#MED RELIABILITY
Engulfing().bullish  or haramiCross().bullish or homingPigeon() or threestarsInTheSouth()
##################################################################
#BULL-DMIStochasticExtreme
crosses(DMI_StochasticExtreme("high low length" = 14),10,crossingDirection.ABOVE)
##################################################################
#StochasticCrossover
#StochasticSLOW (when they cross):
#EX: crosses(stochastic, 80, CrossingDirection.Above)
crosses(Round(SimpleMovingAvg(100*((Close-Lowest(Low,14))/(Highest(high,14)-Lowest(Low,14))), length = 3)),Round(SimpleMovingAvg(SimpleMovingAvg(100*((Close-Lowest(Low,14))/(Highest(high,14)-Lowest(Low,14))), length = 3), length = 3)), crossingDirection.ABOVE) OR
crosses(Round(SimpleMovingAvg(100*((Close-Lowest(Low,14))/(Highest(high,14)-Lowest(Low,14))), length = 3)),Round(SimpleMovingAvg(SimpleMovingAvg(100*((Close-Lowest(Low,14))/(Highest(high,14)-Lowest(Low,14))), length = 3), length = 3)), crossingDirection.BELOW)
##################################################################