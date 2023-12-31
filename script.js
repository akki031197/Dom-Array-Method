// accessing the html element
const main = document.getElementById("main");
const add_user = document.getElementById("add-user");
const double = document.getElementById("double");
const show_millionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculate_wealth = document.getElementById("calculate-wealth");

let data = [];
// calling 3 user when page loaded for the first time
getRandomUser();
getRandomUser();
getRandomUser();
// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first}  ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };
  addData(newUser);
}

// add new obj to data arr
function addData(newUser) {
  data.push(newUser);
  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong> Person </strong>Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort by richest
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

//filter only Millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}
// calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth:${formatMoney(wealth)}</h3>`;
  main.appendChild(wealthEl);
}

//Event Listener
add_user.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
show_millionaires.addEventListener("click", showMillionaires);
calculate_wealth.addEventListener("click", calculateWealth);
