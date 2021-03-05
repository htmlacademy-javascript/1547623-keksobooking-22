import { OFFERS_LABELS } from './data.js';
import { map, MAP_COORDINATES, resetMainMarker } from './map.js';
import { formFilterElement, houseTypeFilterElement } from './filter.js';

const DECIMAL_POINT = 5;
const MAX_ROOM_COUNT = '100';
const MIN_ROOM_CAPACITY = '0';

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
  if (roomCountElement.value === MAX_ROOM_COUNT && roomCapacityElement.value !== MIN_ROOM_CAPACITY) {
    roomCapacityElement.setCustomValidity('Не для гостей');
  } else if ((roomCapacityElement.value === MIN_ROOM_CAPACITY && roomCountElement.value !== MAX_ROOM_COUNT) || roomCountElement.value < roomCapacityElement.value) {
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
  resetUserForm();
  resetMainMarker(MAP_COORDINATES);
  map.closePopup();
  houseTypeFilterElement.dispatchEvent(new Event('change'));
}

function resetUserForm() {
  userFormElement.reset();
  formFilterElement.reset();
}

function resetUserActions() {
  resetUserForm();
  resetMainMarker(MAP_COORDINATES);
  map.closePopup();
}

export { setAddress, resetUserActions, formAdvertElement, fieldAdvertElements, userFormElement };
