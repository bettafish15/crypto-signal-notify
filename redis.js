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

function saveData(key, value) {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  getDataFromKey: getDataFromKey,
  saveData: saveData,
};
