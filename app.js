const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < "1") {
    amtval = 1;
    amount.value = "1";
  }

  const URL = `${base_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error("Network response was not ok");

    let data = await response.json();
    let base = fromCurr.value.toLowerCase();
    let target = toCurr.value.toLowerCase();
    let rate = data[base][target];
    if (rate === undefined) throw new Error("Rate not found");

    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value.toUpperCase()} = ${finalAmount.toFixed(4)} ${toCurr.value.toUpperCase()}`;
  } catch (error) {
    console.error("Error fetching or converting:", error);
    msg.innerText = "Error converting currencies, please try again.";
  }
});


