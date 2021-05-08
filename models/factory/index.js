const btc = require("./btc");

module.exports = function (currencyCode, data, candles) {
  switch (currencyCode) {
    case "BTC/USDT":
      const result = btc(data, candles);
      return result;
  }
};
