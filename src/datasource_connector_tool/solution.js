// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class PriceItem {
  price;
  pair;
  constructor(price) {
    this.price = price;
    this.pair = price.pair;
  }

  mid() {
    return (this.price.buy + this.price.sell) / 2 / 100;
  }

  quote() {
    return this.price.pair.slice(-3);
  }
}

class Datasource {
  constructor() {}

  getPrices() {
    return new Promise(function (resolve, reject) {
      let url = "https://static.ngnrs.io/test/prices";
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onload = function () {
        if (this.status == 200) {
          let prices = JSON.parse(xhr.responseText).data.prices;
          let parsedPrices = prices.map((i) => new PriceItem(i));
          resolve(parsedPrices);
        } else {
          reject({ status: this.status, error: this.statusText });
        }
      };
    });
  }
}

let dt = new Datasource();
dt.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.err(error);
  });
