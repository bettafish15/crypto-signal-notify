const binance = require("../api/binanceAPI");
const telegramBot = require("../telegramBot");
const redis = require("../redis");
const utils = require("../utils");
const factory = require("./factory");
const config = require("../config");
const _ = require("lodash");

const currencyArray = require("../const").currencyArray;
const result = utils.getCurrencyCode(currencyArray);

async function candleMonitor() {
  try {
    const currencyCode = result.next().value;

    //get data price of currency and settings
    const priceStatusDataRedis = await redis.getDataFromKey(currencyCode);
    let configCurrencyDataRedis = await redis.getCurrencyConfig(currencyCode);
    if (_.isEmpty(configCurrencyDataRedis)) {
      configCurrencyDataRedis.monitorMode = config.defaultMonitorMode;
      configCurrencyDataRedis.timeNotify = config.defaultTTL;
      configCurrencyDataRedis.interval = config.defaultInterval;
    }

    const candles = await binance.getBulkCandleData(
      currencyCode,
      configCurrencyDataRedis
    );
    const analyzeData = factory(currencyCode, candles);

    switch (configCurrencyDataRedis.monitorMode) {
      case "lazy":
        if (
          analyzeData.status != configCurrencyDataRedis.lastPriceStatus &&
          !priceStatusDataRedis
        ) {
          await redis.saveData(
            currencyCode,
            analyzeData,
            Number(configCurrencyDataRedis.timeNotify)
          );
          telegramBot.sendMessage(process.env.chatId, analyzeData.message);
          configCurrencyDataRedis.lastPriceStatus = analyzeData.status;
        }
        break;
      case "eager":
        if (!priceStatusDataRedis) {
          await redis.saveData(
            currencyCode,
            analyzeData,
            Number(configCurrencyDataRedis.timeNotify)
          );
          telegramBot.sendMessage(process.env.chatId, analyzeData.message);
          configCurrencyDataRedis.lastPriceStatus = analyzeData.status;
        }
        break;
    }

    //update config
    await redis.saveCurrencyConfig(currencyCode, configCurrencyDataRedis);
  } catch (err) {
    console.error(err);
  }
}

module.exports = candleMonitor;
