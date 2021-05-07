const Ichimoku = require("../../indicator").Ichimoku;

module.exports = function (data, candles) {
  const ichimoku = new Ichimoku({
    conversionPeriod: 9,
    basePeriod: 26,
    spanPeriod: 52,
    displacement: 26,
    values: [],
  });
  for (const i in candles) {
    const ichimokuValue = ichimoku.nextValue({
      high: candles[i].high,
      low: candles[i].low,
      close: candles[i].closed,
    });
    candles[i] = {
      priceData: candles[i],
      ichimokuData: ichimokuValue,
    };
    console.log("candle: "+i);
    console.log(candles[i]);
  }
  if (!data) {
      const lastCandle = candles[198];
      //console.log(lastCandle);
    //   const ichimokuDataOfLastCandle = {
    //       conversion: candles[198],
    //       base: candles[]
    //   }
      if(lastCandle.priceData.closed > lastCandle.conversion && lastCandle.priceData.closed > lastCandle.base){

      }
  } else {
  }
};
