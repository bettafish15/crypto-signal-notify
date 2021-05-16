const btc = require("./btc");

module.exports = function (currencyCode, candles) {
  switch (currencyCode) {
    case "BTC/USDT":
      const result = btc(candles);
      return result;
  }
};
