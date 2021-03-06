import { OFFERS_LABELS } from './data.js';
import { resetFilters } from './filter.js';
import { resetMap } from './map.js';

const DECIMAL_POINT = 5;
const MAX_ROOM_COUNT = 100;
const MIN_ROOM_CAPACITY = 0;

const houseTypeElement = document.querySelector('.house-type');
const housePriceElement = document.querySelector('.house-price');
const timeInElement = document.querySelector('.timein');
const timeOutElement = document.querySelector('.timeout');
const formAdvertElement = document.querySelector('.ad-form');
const fieldAdvertElements = document.querySelectorAll('.ad-form fieldset');
const addressElement = document.querySelector('.address');
const roomCountElement = document.querySelector('.room-number');
const roomCapacityElement = document.querySelector('.capacity');
const userFormElement = document.querySelector('.ad-form');
const resetFormElement = document.querySelector('.ad-form__reset');

addressElement.setAttribute('readonly', '');

houseTypeElement.addEventListener('change', onHouseTypeElementChange);
timeInElement.addEventListener('change', ontimeInElementChange);
timeOutElement.addEventListener('change', ontimeOutElementChange);
roomCountElement.addEventListener('change', onRoomCountElementChange);
roomCapacityElement.addEventListener('change', onRoomCapacityElementChange);
resetFormElement.addEventListener('click', onResetFormElementClick);

formAdvertElement.classList.add('ad-form--disabled');
fieldAdvertElements.forEach((item) => item.setAttribute('disabled', ''));

function onHouseTypeElementChange() {
  setMinPriceForHouseType();
}

function setMinPriceForHouseType() {
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

function setAddress(coords) {
  addressElement.value = `${coords.lat.toFixed(DECIMAL_POINT)}, ${coords.lng.toFixed(DECIMAL_POINT)}`;
}

function checkCapacity() {
  const roomCapacity = +roomCapacityElement.value;
  const roomCount = +roomCountElement.value;

  if (roomCount === MAX_ROOM_COUNT && roomCapacity !== MIN_ROOM_CAPACITY) {
    roomCapacityElement.setCustomValidity('Не для гостей');
  } else if ((roomCapacity === MIN_ROOM_CAPACITY && roomCount !== MAX_ROOM_COUNT) || roomCount < roomCapacity) {
    roomCountElement.setCustomValidity('Недостаточно комнат');
  } else {
    roomCountElement.setCustomValidity('');
    roomCapacityElement.setCustomValidity('');
  }
}

function onRoomCountElementChange() {
  checkCapacity();
}

function onRoomCapacityElementChange() {
  checkCapacity();
}

function onResetFormElementClick(evt) {
  evt.preventDefault();
  resetUserActions();
}

function resetForm() {
  userFormElement.reset();
}

function resetUserActions() {
  resetForm();
  setMinPriceForHouseType();
  resetFilters();
  resetMap();
}

export { setAddress, resetForm, resetUserActions, formAdvertElement, fieldAdvertElements, userFormElement };
