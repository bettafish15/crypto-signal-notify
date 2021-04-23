const axios = require("axios");

async function getPrice(currencyCode) {
  try {
    return await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=" + currencyCode
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getPrice: getPrice,
};
