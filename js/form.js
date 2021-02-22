import { OFFERS_LABELS } from './data.js';

const DECIMAL_POINT = 5;
const ROOM_GUEST_CAPACITY = {
  one: {
    max: 1,
    choice: [1],
  },
  two: {
    max: 2,
    choice: [1, 2],
  },
  three: {
    max: 3,
    choice: [1, 2, 3],
  },
  oneHundred: {
    max: 0,
    choice: [0],
  },
};

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
const roomCountElement = document.querySelector('.room-number');
const roomCapacityElement = document.querySelector('.capacity');

addressElement.setAttribute('readonly', '');

houseTypeElement.addEventListener('change', onHouseTypeElementChange);
timeInElement.addEventListener('change', ontimeInElementChange);
timeOutElement.addEventListener('change', ontimeOutElementChange);
roomCountElement.addEventListener('change', onCheckCapasityChange);

formFilterElement.classList.add('map__filters--disabled');
formAdvertElement.classList.add('ad-form--disabled');

fieldAdvertElements.forEach((item) => item.setAttribute('disabled', ''));
housingFilterElements.forEach((item) => item.setAttribute('disabled', ''));
housingFeatureElement.setAttribute('disabled', '');

function onHouseTypeElementChange() {
  const type = houseTypeElement.value;
  housePriceElement.placeholder = OFFERS_LABELS[type].price;
  housePriceElement.min = OFFERS_LABELS[type].price;
}

function ontimeInElementChange() {
  timeOutElement.value = timeInElement.value;
}

function ontimeOutElementChange() {
  timeInElement.value = timeOutElement.value;
}

function enableForm() {
  formFilterElement.classList.remove('map__filters--disabled');
  formAdvertElement.classList.remove('ad-form--disabled');

  fieldAdvertElements.forEach((item) => item.removeAttribute('disabled'));
  housingFilterElements.forEach((item) => item.removeAttribute('disabled'));
  housingFeatureElement.removeAttribute('disabled');
}

function setAddress(coords) {
  addressElement.value = `${coords.lat.toFixed(DECIMAL_POINT)}, ${coords.lng.toFixed(DECIMAL_POINT)}`;
}

function addDisabledRoomCapasity() {
  roomCapacityElement.querySelectorAll('option').forEach((item) => {
    item.setAttribute('disabled', '');
  });
}

function removeDisabledRoomCapasity(optionValue) {
  optionValue.forEach((item) => {
    roomCapacityElement.querySelector(`option[value="${item}"]`).removeAttribute('disabled');
  });
}

function onCheckCapasityChange() {
  switch (roomCountElement.value) {
    case '1':
      addDisabledRoomCapasity();
      removeDisabledRoomCapasity(ROOM_GUEST_CAPACITY.one.choice);
      roomCapacityElement.value = ROOM_GUEST_CAPACITY.one.max;
      break;
    case '2':
      addDisabledRoomCapasity();
      removeDisabledRoomCapasity(ROOM_GUEST_CAPACITY.two.choice);
      roomCapacityElement.value = ROOM_GUEST_CAPACITY.two.max;
      break;
    case '3':
      addDisabledRoomCapasity();
      removeDisabledRoomCapasity(ROOM_GUEST_CAPACITY.three.choice);
      roomCapacityElement.value = ROOM_GUEST_CAPACITY.three.max;
      break;
    case '100':
      addDisabledRoomCapasity();
      removeDisabledRoomCapasity(ROOM_GUEST_CAPACITY.oneHundred.choice);
      roomCapacityElement.value = ROOM_GUEST_CAPACITY.oneHundred.max;
      break;
  }
}

onCheckCapasityChange();

export { enableForm, setAddress };
