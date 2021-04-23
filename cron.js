process.env.NTBA_FIX_319 = 1;
let CronJob = require("cron").CronJob;

const binance = require('./api/binanceAPI');
const telegramBot = require('./telegramBot');
const taapi = require('./api/taapiAPI');
const utils = require('./utils');

const currencyArray = ["BTC/USDT", "ETH/USDT", "XRP/USDT", "LTC/USDT", "XMR/USDT"];
const result = utils.queryCurrencyCode(currencyArray);

// this is job for sending telegram noti
new CronJob('0 0 * * * *', function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  // bot.sendMessage(chatId, 'Received your message');
}).start();

// this is job for querying taapi
new CronJob("0-59 * * * * *", async function() {
  const currencyCode = result.next().value.split("/").join("");
  const price = await binance.getPrice(currencyCode);
  console.log(currencyCode);
  console.log(price);
}).start();


// {
//   "conversion": 49960.505000000005,
//   "base": 51610.740000000005,
//   "spanA": 50763.332500000004,
//   "spanB": 52023.35,
//   "currentSpanA": 54124.675,
//   "currentSpanB": 54818.619999999995,
//   "laggingSpanA": 55606.2225,
//   "laggingSpanB": 55428.384999999995
// }