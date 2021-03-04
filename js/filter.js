import { formAdvertElement, fieldAdvertElements } from './form.js';

const MAX_ARRAY_LENGTH = 10;
const START_ARRAY_POINT = 0;
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
const mapFeaturesElements = document.querySelectorAll('.map__checkbox');

formFilterElement.classList.add('map__filters--disabled');
housingFilterElements.forEach((item) => item.setAttribute('disabled', ''));
housingFeatureElement.setAttribute('disabled', '');

function addOnChangeForFilters(cb) {
  [houseTypeFilterElement, housePriceFilterElement, houseRoomsFilterElement, houseGuestsFilterElement].forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });
  mapFeaturesElements.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });
}

function enableForm() {
  formFilterElement.classList.remove('map__filters--disabled');
  formAdvertElement.classList.remove('ad-form--disabled');

  fieldAdvertElements.forEach((item) => item.removeAttribute('disabled'));
  housingFilterElements.forEach((item) => item.removeAttribute('disabled'));
  housingFeatureElement.removeAttribute('disabled');
}

function getFilteredAdverts(array) {
  const filteredAdverts = [];

  array.forEach((item) => {
    if (checkAdvertsByType(item) && checkAdvertsByPrice(item) && checkAdvertsByRooms(item) && checkAdvertsByGuests(item) && checkAdvertsByFeatures(item)) {
      filteredAdverts.push(item);
    }
  });

  return filteredAdverts.slice(START_ARRAY_POINT, MAX_ARRAY_LENGTH);
}

function checkAdvertsByType(ads) {
  return ads.offer.type === houseTypeFilterElement.value || houseTypeFilterElement.value === DEFAULT_FILTER_VALUE;
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

function checkAdvertsByRooms(ads) {
  return ads.offer.rooms.toString() === houseRoomsFilterElement.value || houseRoomsFilterElement.value === DEFAULT_FILTER_VALUE;
}

function checkAdvertsByGuests(ads) {
  return ads.offer.guests.toString() === houseGuestsFilterElement.value || houseGuestsFilterElement.value === DEFAULT_FILTER_VALUE;
}

// function checkAdvertsByFeatures(ads) {
//   let flag = true;
//   mapFeaturesElements.forEach((item) => {
//     if (item.checked) {
//       if (ads.offer.features.indexOf(item.value) === -1) {
//         flag = false;
//       }
//     }
//   });
//   return flag;
// }

function checkAdvertsByFeatures(ads) {
  for (let i = 0; i < mapFeaturesElements.length; i++) {
    if (mapFeaturesElements[i].checked) {
      if (ads.offer.features.indexOf(mapFeaturesElements[i].value) === -1) {
        return false;
      }
    }
  }
  return true;
}

export { houseTypeFilterElement, formFilterElement, addOnChangeForFilters, enableForm, getFilteredAdverts };
