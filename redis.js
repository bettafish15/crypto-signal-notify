const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

function getDataFromKey(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  getDataFromKey: getDataFromKey,
};
