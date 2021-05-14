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
      let dataFromRedis = await redis.getCurrencyConfig(currencyCode);
      const timeNotify =
        dataFromRedis && dataFromRedis.timeNotify
          ? dataFromRedis.timeNotify
          : 1;
      await redis.saveData(currencyCode, analyzeData, Number(timeNotify));
      telegramBot.sendMessage(process.env.chatId, analyzeData.message);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = candleMonitor;
