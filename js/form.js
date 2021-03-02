import { OFFERS_LABELS } from './data.js';
import { sendData } from './api.js';
import { map, MAP_COORDINATES, setPositionMainMarker, createMarkers } from './map.js';

const DECIMAL_POINT = 5;
const ERROR_RECEIVING_TEXT = 'Не удалось загрузить объявления. Попробуйте перезагрузить страницу';
const ALERT_SHOW_TIME = 5000;
const MAX_ROOM_COUNT = '100';
const MIN_ROOM_CAPACITY = '0';

const mainElement = document.querySelector('.main');
const houseTypeElement = document.querySelector('.house-type');
const housePriceElement = document.querySelector('.house-price');
const timeInElement = document.querySelector('.timein');
const timeOutElement = document.querySelector('.timeout');
const formFilterElement = document.querySelector('.map__filters');
const housingFilterElements = document.querySelectorAll('.map__filter');
const houseTypeFilterElement = document.querySelector('.map__filter--type');
const housingFeatureElement = document.querySelector('.map__features');
const formAdvertElement = document.querySelector('.ad-form');
const fieldAdvertElements = document.querySelectorAll('.ad-form fieldset');
const addressElement = document.querySelector('.address');
const roomCountElement = document.querySelector('.room-number');
const roomCapacityElement = document.querySelector('.capacity');
const userFormElement = document.querySelector('.ad-form');
const resetFormElement = document.querySelector('.ad-form__reset');
const successMessageTemplateElement = document.querySelector('.template-success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('.template-error').content.querySelector('.error');
const alertMessageTemplateElement = document.querySelector('.template-alert').content.querySelector('.alert');

addressElement.setAttribute('readonly', '');

houseTypeElement.addEventListener('change', onHouseTypeElementChange);
timeInElement.addEventListener('change', ontimeInElementChange);
timeOutElement.addEventListener('change', ontimeOutElementChange);
roomCountElement.addEventListener('change', onRoomCountElementChange);
roomCapacityElement.addEventListener('change', onRoomCapacityElementChange);
userFormElement.addEventListener('submit', onUserFormElementSubmit);
resetFormElement.addEventListener('click', onResetFormElementClick);

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

function setHouseTypeFilter(data) {
  houseTypeFilterElement.addEventListener('change', () => {
    createMarkers(data);
  });
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

function onUserFormElementSubmit(evt) {
  evt.preventDefault();
  sendData(createSuccessSendMessage, createFailSendMessage, new FormData(evt.target));
}

function onResetFormElementClick(evt) {
  evt.preventDefault();
  resetUserForm();
  resetMainMarker(MAP_COORDINATES);
  map.closePopup();
  houseTypeFilterElement.dispatchEvent(new Event('change'));
}

function createMessage(template, reset) {
  const message = template.cloneNode(true);

  if (reset) {
    resetUserForm();
    resetMainMarker(MAP_COORDINATES);
    map.closePopup();
  }

  mainElement.appendChild(message);

  removeMessage(message);
}

function resetUserForm() {
  userFormElement.reset();
  formFilterElement.reset();
}

function resetMainMarker(coords) {
  setAddress(coords);
  setPositionMainMarker(coords);
}

function removeMessage(message) {
  document.addEventListener(
    'keydown',
    (evt) => {
      if (evt.key === 'Escape') {
        message.remove();
      }
    },
    { once: true }
  );

  document.addEventListener(
    'click',
    () => {
      message.remove();
    },
    { once: true }
  );
}

function createSuccessSendMessage() {
  createMessage(successMessageTemplateElement, true);
}

function createFailSendMessage() {
  createMessage(errorMessageTemplateElement);
}

function createFailReceivingMessage() {
  const alert = alertMessageTemplateElement.cloneNode(true);

  alert.querySelector('.alert__message').textContent = ERROR_RECEIVING_TEXT;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
}

export { enableForm, setAddress, createFailReceivingMessage, houseTypeFilterElement, setHouseTypeFilter };
