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
  }
  const lastCandle = candles[198];
  console.log(lastCandle);
  if (
    lastCandle.priceData.closed > lastCandle.ichimokuData.spanA &&
    lastCandle.priceData.closed > lastCandle.ichimokuData.spanB &&
    data != "uptrend"
  ) {
    // uptrend
    return "uptrend";
  } else if (
    lastCandle.priceData.closed < lastCandle.ichimokuData.spanA &&
    lastCandle.priceData.closed < lastCandle.ichimokuData.spanB &&
    data != "downtrend"
  ) {
    //downtrend
    return "downtrend";
  } else if (
    ((lastCandle.priceData.closed > lastCandle.ichimokuData.spanA &&
      lastCandle.priceData.closed < lastCandle.ichimokuData.spanB) ||
      (lastCandle.priceData.closed < lastCandle.ichimokuData.spanA &&
        lastCandle.priceData.closed > lastCandle.ichimokuData.spanB)) &&
    data != "neutral"
  ) {
    // neutral
    return "neutral";
  } else {
    return;
  }
};
