const TelegramBot = require("node-telegram-bot-api");
const redis = require("./redis");
const constData = require("./const");

const telegramToken = process.env.telegramToken;
const chatId = process.env.chatId;

const bot = new TelegramBot(telegramToken, { polling: true });

bot.onText(/\/setInterval (.+)/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const resp = match[1];
    const currencyCode = resp.split(" ")[0];
    const interval = resp.split(" ")[1];
    if (!interval || !constData.currencyArray.includes(currencyCode)) {
      bot.sendMessage(chatId, "format is wrong");
      return;
    }

    let dataFromRedis = await redis.getCurrencyConfig(currencyCode);
    dataFromRedis.interval = interval;
    redis.saveData("config." + currencyCode, dataFromRedis);

    bot.sendMessage(chatId, resp);
  } catch (err) {
    console.error(err);
  }
});

bot.onText(/\/setTimeNotify (.+)/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const resp = match[1];
    const currencyCode = resp.split(" ")[0];
    const timeNotify = resp.split(" ")[1];
    if (!timeNotify || !constData.currencyArray.includes(currencyCode)) {
      bot.sendMessage(chatId, "format is wrong");
      return;
    }
    let dataFromRedis = await redis.getCurrencyConfig(currencyCode);
    dataFromRedis.timeNotify = timeNotify;
    redis.saveData("config." + currencyCode, dataFromRedis);

    bot.sendMessage(chatId, resp);
  } catch (err) {
    console.error(err);
  }
});

module.exports = bot;
