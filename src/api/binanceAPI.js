const axios = require("axios");
const constData = require("../const");
const redis = require("../redis");

async function getBulkCandleData(currencyCode) {
  try {
    const dataFromRedis = await redis.getDataFromKey("config." + currencyCode);
    const interval =
      dataFromRedis && dataFromRedis.interval ? dataFromRedis.interval : "1h";
    const limit = constData.numberOfCandle;
    currencyCodeForBinance = currencyCode.split("/").join("");
    return await axios
      .get(
        "https://api.binance.com/api/v3/klines?symbol=" +
          currencyCodeForBinance +
          "&interval=" +
          interval +
          "&limit=" +
          limit
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
