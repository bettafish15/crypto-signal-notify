process.env.NTBA_FIX_319 = 1;
let CronJob = require("cron").CronJob;
let candleMonitor = require("./models/candleMonitor");

// this is job for processing data from binance
new CronJob("0-59 * * * * *", async function () {
  candleMonitor();
}).start();
