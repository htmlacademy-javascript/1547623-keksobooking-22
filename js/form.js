import { OFFERS_LABELS } from './data.js';

function changeMinPrice() {
  const type = houseTypeElement.value;
  housePriceElement.placeholder = OFFERS_LABELS[type].price;
  housePriceElement.min = OFFERS_LABELS[type].price;
}

const houseTypeElement = document.querySelector('.house-type');
const housePriceElement = document.querySelector('.house-price');
const timeInElement = document.querySelector('.timein');
const timeOutElement = document.querySelector('.timeout');
const formFilterElement = document.querySelector('.map__filters');
const housingFilterElements = document.querySelectorAll('.map__filter');
const housingFeatureElement = document.querySelector('.map__features');
const formAdvertElement = document.querySelector('.ad-form');
const fieldAdvertElements = document.querySelectorAll('.ad-form fieldset');
const addressElement = document.querySelector('.address');

houseTypeElement.addEventListener('change', changeMinPrice);
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});
timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

formFilterElement.classList.add('map__filters--disabled');
formAdvertElement.classList.add('ad-form--disabled');

fieldAdvertElements.forEach((item) => item.setAttribute('disabled', ''));
housingFilterElements.forEach((item) => item.setAttribute('disabled', ''));
housingFeatureElement.setAttribute('disabled', '');

export { addressElement, formFilterElement, formAdvertElement, fieldAdvertElements, housingFilterElements, housingFeatureElement };
