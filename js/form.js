const HOUSING_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

function changeMinPrice() {
  const type = houseTypeElement.value;
  housePriceElement.placeholder = HOUSING_PRICE[type];
  housePriceElement.min = HOUSING_PRICE[type];
}

const houseTypeElement = document.querySelector('.house-type');
const housePriceElement = document.querySelector('.house-price');
const timeInElement = document.querySelector('.timein');
const timeOutElement = document.querySelector('.timeout');

document.addEventListener('DOMContentLoaded', changeMinPrice);

houseTypeElement.addEventListener('change', changeMinPrice);
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});
timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});
