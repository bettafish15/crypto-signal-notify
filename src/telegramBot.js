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

    let configCurrencyDataRedis = await redis.getCurrencyConfig(currencyCode);
    configCurrencyDataRedis.interval = interval;
    const result = await redis.saveCurrencyConfig(currencyCode, configCurrencyDataRedis);

    bot.sendMessage(chatId, result);
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
    let configCurrencyDataRedis = await redis.getCurrencyConfig(currencyCode);
    configCurrencyDataRedis.timeNotify = timeNotify;
    const result = await redis.saveCurrencyConfig(currencyCode, configCurrencyDataRedis);

    bot.sendMessage(chatId, result);
  } catch (err) {
    console.error(err);
  }
});

bot.onText(/\/setMonitorMode (.+)/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const resp = match[1];
    const currencyCode = resp.split(" ")[0];
    const monitorMode = resp.split(" ")[1];
    if (!monitorMode || !constData.currencyArray.includes(currencyCode)) {
      bot.sendMessage(chatId, "format is wrong");
      return;
    }
    let configCurrencyDataRedis = await redis.getCurrencyConfig(currencyCode);
    configCurrencyDataRedis.monitorMode = monitorMode;
    const result = await redis.saveCurrencyConfig(currencyCode, configCurrencyDataRedis);

    bot.sendMessage(chatId, result);
  } catch (err) {
    console.error(err);
  }
});

bot.onText(/\/help/, () => {
  try {
    const message = `/setInterval [currencyCode] [intervalTime] \n /setTimeNotify [currencyCode] [timeNotify] \n /setMonitorMode [currencyCode] [mode]`;
    bot.sendMessage(chatId, message);
  } catch (err) {
    console.error(err);
  }
});

module.exports = bot;
