const Ichimoku = require("../../indicator").Ichimoku;

module.exports = function (candles) {
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
  const lastCandle = candles[199];
  let result;

  if (
    lastCandle.priceData.closed > lastCandle.ichimokuData.spanA &&
    lastCandle.priceData.closed > lastCandle.ichimokuData.spanB
  ) {
    // uptrend
    result = {
      status: "uptrend",
      message: "btc is uptrend",
    };
  } else if (
    lastCandle.priceData.closed < lastCandle.ichimokuData.spanA &&
    lastCandle.priceData.closed < lastCandle.ichimokuData.spanB
  ) {
    //downtrend
    result = {
      status: "downtrend",
      message: "btc is downtrend",
    };
  } else if (
    (lastCandle.priceData.closed > lastCandle.ichimokuData.spanA &&
      lastCandle.priceData.closed < lastCandle.ichimokuData.spanB) ||
    (lastCandle.priceData.closed < lastCandle.ichimokuData.spanA &&
      lastCandle.priceData.closed > lastCandle.ichimokuData.spanB)
  ) {
    // neutral
    result = {
      status: "neutral",
      message: "btc is neutral",
    };
  }

  return result;
};
