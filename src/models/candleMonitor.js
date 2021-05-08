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
    const dataRedis = await redis.getDataFromKey(currencyCode);
    const candles = await binance.getBulkCandleData(currencyCode);
    const analyzeData = factory(currencyCode, dataRedis, candles);
    if (analyzeData) {
      await redis.saveData(currencyCode, JSON.stringify(analyzeData));
      telegramBot.sendMessage(
        process.env.chatId,
        analyzeData.message
      );
    }

    return;
  } catch (err) {
    console.error(err);
  }
}

module.exports = candleMonitor;
