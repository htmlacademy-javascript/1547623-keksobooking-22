import { formAdvertElement, fieldAdvertElements } from './form.js';

const MAX_ADVERTS_COUNT = 10;
const DEFAULT_FILTER_VALUE = 'any';
const HOUSING_PRICE = {
  middle: {
    from: 10000,
    to: 50000,
  },
  low: 10000,
  high: 50000,
};

const formFilterElement = document.querySelector('.map__filters');
const housingFilterElements = document.querySelectorAll('.map__filter');
const housingFeatureElement = document.querySelector('.map__features');
const houseTypeFilterElement = document.querySelector('.map__filter--type');
const housePriceFilterElement = document.querySelector('.map__filter--price');
const houseRoomsFilterElement = document.querySelector('.map__filter--rooms');
const houseGuestsFilterElement = document.querySelector('.map__filter--guests');
const filtersElements = document.querySelectorAll('.map__filter');
const mapFeaturesElements = document.querySelectorAll('.map__checkbox');

formFilterElement.classList.add('map__filters--disabled');
housingFilterElements.forEach(function (item) {
  item.setAttribute('disabled', '');
});
housingFeatureElement.setAttribute('disabled', '');

function addOnChangeForFilters(cb) {
  [...filtersElements, ...mapFeaturesElements].forEach(function (item) {
    item.addEventListener('change', function () {
      cb();
    });
  });
}

function enableForm() {
  formFilterElement.classList.remove('map__filters--disabled');
  formAdvertElement.classList.remove('ad-form--disabled');

  fieldAdvertElements.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  housingFilterElements.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  housingFeatureElement.removeAttribute('disabled');
}

function getFilteredAdverts(array) {
  const filteredAdverts = [];

  for (let i = 0; filteredAdverts.length < MAX_ADVERTS_COUNT && array[i]; i++) {
    if (
      checkAdverts(array[i], 'type', houseTypeFilterElement) &&
      checkAdverts(array[i], 'rooms', houseRoomsFilterElement, true) &&
      checkAdverts(array[i], 'guests', houseGuestsFilterElement, true) &&
      checkAdvertsByPrice(array[i]) &&
      checkAdvertsByFeatures(array[i])
    ) {
      filteredAdverts.push(array[i]);
    }
  }

  return filteredAdverts;
}

function checkAdverts(ads, filter, element, number) {
  let value = element.value;

  if (number) {
    value = +element.value;
  }

  return ads.offer[filter] === value || element.value === DEFAULT_FILTER_VALUE;
}

function checkAdvertsByPrice(ads) {
  const price = ads.offer.price;

  if (housePriceFilterElement.value === 'middle') {
    return price >= HOUSING_PRICE.middle.from && price <= HOUSING_PRICE.middle.to;
  }

  if (housePriceFilterElement.value === 'low') {
    return price <= HOUSING_PRICE.low;
  }

  if (housePriceFilterElement.value === 'high') {
    return price >= HOUSING_PRICE.high;
  }

  return true;
}

function checkAdvertsByFeatures(ads) {
  return [...mapFeaturesElements].every(function (item) {
    if (item.checked) {
      return ads.offer.features.indexOf(item.value) !== -1;
    } else {
      return true;
    }
  });
}

function resetFilters() {
  formFilterElement.reset();
}

export { houseTypeFilterElement, MAX_ADVERTS_COUNT, addOnChangeForFilters, enableForm, getFilteredAdverts, resetFilters };
