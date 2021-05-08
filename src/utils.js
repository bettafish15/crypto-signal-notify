function* getCurrencyCode(currencyArray) {
  let i = 0;
  while (true) {
    yield currencyArray[i];
    i < currencyArray.length - 1 ? (i += 1) : (i = 0);
  }
}

module.exports = {
    getCurrencyCode: getCurrencyCode,
}