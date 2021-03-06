const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", function (error) {
  console.error(error);
});

function getDataFromKey(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) reject(err);
      res = JSON.parse(res);
      resolve(res);
    });
  });
}

function saveData(key, value, ttl = undefined) {
  return new Promise((resolve, reject) => {
    if (ttl) {
      client.set(key, JSON.stringify(value), "EX", ttl, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } else {
      client.set(key, JSON.stringify(value), (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    }
  });
}

function getCurrencyConfig(currency) {
  return new Promise((resolve, reject) => {
    client.get("config." + currency, (err, res) => {
      if (err) reject(err);
      res = JSON.parse(res);
      if (!res) {
        res = {};
      }
      resolve(res);
    });
  });
}

function saveCurrencyConfig(currency, value) {
  return new Promise((resolve, reject) => {
    client.set("config." + currency, JSON.stringify(value), (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  getDataFromKey: getDataFromKey,
  saveData: saveData,
  getCurrencyConfig: getCurrencyConfig,
  saveCurrencyConfig: saveCurrencyConfig
};
