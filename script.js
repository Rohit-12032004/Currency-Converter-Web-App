const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const form = document.getElementById("converter");

// Fetch currency list
fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      let option1 = document.createElement("option");
      let option2 = document.createElement("option");
      option1.value = option2.value = currency;
      option1.text = option2.text = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      result.innerText = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.innerText = "Error fetching conversion rate.";
    });
});
