const btc = require("./btc");

module.exports = function (currencyCode, data, candles) {
  switch (currencyCode) {
    case "BTC/USDT":
      btc(data, candles);
      break;
  }
};
