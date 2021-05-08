const TelegramBot = require('node-telegram-bot-api');

const telegramToken = process.env.telegramToken;
const chatId = process.env.chatId;

const bot = new TelegramBot(telegramToken, {polling: true});

module.exports = bot;