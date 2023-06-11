import { roundFraction, data } from './main.js';

const currenciesToSell = new Set(data.data.map((el) => el.currency));
const currenciesToBuy = new Set(
  Object.keys(data["currencies-pairs"]).map((el) => el.split("-")[1])
);

/**
 *  Creating a DOM element with passed props
 */
const createElement = (element, props) => {
  const el = document.createElement(element);
  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      el[key] = props[key];
    }
  }
  return el;
};

const form = document.getElementById("form");

/**
 *  Creating a convertor fields
 */
function addFields() {
  for (const currency of currenciesToSell) {
    const coinInputWrapper = createElement("div", {
      id: `${currency}-wrapper`,
      className: "coin-input-wrapper",
    });
    const coinNameSpan = createElement("span", {
      id: `${currency}-name`,
      innerText: `${currency} `,
      className: "coin-name",
    });
    const coinsNumberInput = createElement("input", {
      type: "number",
      name: currency,
      id: currency,
      value: "0",
      className: "coins-number-input",
    });
    const conversionResultSpan = createElement("span", {
      id: `result-${currency}`,
      className: "coin-result",
    });
    coinInputWrapper.appendChild(coinNameSpan);
    coinInputWrapper.appendChild(coinsNumberInput);
    coinInputWrapper.appendChild(conversionResultSpan);
    form.appendChild(coinInputWrapper);
    form.appendChild(document.createElement("br"));
  }
  const selectLabel = createElement("label", {
    for: "converting-currencies",
    className: "select-label",
    innerText: "Choose a currency to buy",
  });
  const selectOption = createElement("select", {
    id: "converting-currencies",
    name: "converting-currencies",
    className: "select-dropdown",
  });
  form.appendChild(selectLabel);
  form.appendChild(selectOption);
  for (const currencyOption of currenciesToBuy) {
    const option = createElement("option", {
      value: currencyOption,
      text: currencyOption,
    });
    selectOption.appendChild(option);
  }
  const submit = createElement("input", {
    type: "submit",
    className: "submit",
  });
  form.appendChild(submit);
}

addFields();

/**
 *  Handling submit button click action. Converting each currency and showing total result.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const convertingCurrencyValue = document.getElementById(
    "converting-currencies"
  ).value;
  const totalResultEl = document.getElementById("total-result");

  let totalResult = 0;
  for (const currency of currenciesToSell) {
    const exchangeResultElement = document.getElementById(`result-${currency}`);
    const coinsNumberValue = document.getElementById(currency).value;
    const coinsNumber = parseFloat(coinsNumberValue) || 0;
    const exchangePrice =
      data["currencies-pairs"][`${currency}-${convertingCurrencyValue}`];

    // Getting conversion result and checking whether a coin has its pair
    const exchangeResultValue =
      coinsNumberValue === ""
        ? 0
        : currency === convertingCurrencyValue
        ? coinsNumber
        : exchangePrice === undefined
        ? `${currency}-${convertingCurrencyValue} pair does not exist`
        : roundFraction(coinsNumber * exchangePrice);

    if (typeof exchangeResultValue === "number") {
      totalResult = roundFraction(totalResult + exchangeResultValue);
    }
    exchangeResultElement.innerText = `${exchangeResultValue} ${convertingCurrencyValue}`;
  }
  totalResultEl.innerText = `${totalResult} ${convertingCurrencyValue}`;
});
