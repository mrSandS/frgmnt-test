const res = await fetch('./task2.json');
export const data = await res.json();

/**
 *  Round number to 6 digits
 */
export const roundFraction = (num) => parseFloat(num.toFixed(6));

const getCurrenciesPrice = (currenciesToSell, currencyToBuy) => {
  let totalResult = 0;
  for (let i = 0; i < currenciesToSell.length; i++) {
    const { currency, coinsNumber } = currenciesToSell[i];
    const exchangePrice =
      data["currencies-pairs"][`${currency}-${currencyToBuy}`];

    if (exchangePrice === undefined && currency !== currencyToBuy) {
      console.error(`${currency}-${currencyToBuy} pair does not exist`);
    } else if (currency && currencyToBuy) {
      totalResult +=
        currency === currencyToBuy ? coinsNumber : exchangePrice * coinsNumber;
    }
  }
  return roundFraction(totalResult);
};

console.log(
  "CONVERSION RESULT: ",
  getCurrenciesPrice(
    [
      { currency: "BTC", coinsNumber: 1 },
      { currency: "ETH", coinsNumber: 2 },
    ],
    "USDT"
  )
);
