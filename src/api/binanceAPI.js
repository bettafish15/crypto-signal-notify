const axios = require("axios");
const config = require("../config");

async function getBulkCandleData(currencyCode, configCurrencyDataRedis) {
  try {
    currencyCodeForBinance = currencyCode.split("/").join("");
    return await axios
      .get(
        "https://api.binance.com/api/v3/klines?symbol=" +
          currencyCodeForBinance +
          "&interval=" +
          configCurrencyDataRedis.interval +
          "&limit=" +
          config.numberOfCandle
      )
      .then((response) => {
        const result = [];
        response.data.forEach((candle) => {
          result.push({
            high: parseFloat(candle[2]),
            low: parseFloat(candle[3]),
            closed: parseFloat(candle[4]),
            openTime: candle[0],
          });
        });
        return result;
      });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getBulkCandleData: getBulkCandleData,
};
