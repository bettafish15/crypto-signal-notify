const binance = require("../api/binanceAPI");
const telegramBot = require("../telegramBot");
const redis = require("../redis");
const utils = require("../utils");
const factory = require("./factory");

const currencyArray = require("../const").currencyArray;
const result = utils.getCurrencyCode(currencyArray);

async function candleMonitor() {
  try {
    const currencyCode = result.next().value;
    const data = await redis.getDataFromKey(currencyCode);
    const candles = await binance.getBulkCandleData(currencyCode);
    factory(currencyCode, data, candles);

    return;
  } catch (err) {
    console.error(err);
  }
}

module.exports = candleMonitor;
