import { OFFERS_LABELS } from './data.js';
import { sendData } from './api.js';

const DECIMAL_POINT = 5;
const ERROR_RECEIVING_TEXT = 'Не удалось загрузить объявления. Попробуйте перезагрузить страницу';
const ALERT_SHOW_TIME = 5000;

const mainElement = document.querySelector('.main');
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
const userFormElement = document.querySelector('.ad-form');
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

function checkCapacity() {
  if (roomCountElement.value === '100' && roomCapacityElement.value !== '0') {
    roomCapacityElement.setCustomValidity('Не для гостей');
  } else if ((roomCapacityElement.value === '0' && roomCountElement.value !== '100') || roomCountElement.value < roomCapacityElement.value) {
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

  sendData(getSuccessSendMessage, getFailSendMessage, new FormData(evt.target));
}

function createMessage(template, reset) {
  const message = template.cloneNode(true);

  if (reset) {
    userFormElement.reset();
  }

  mainElement.appendChild(message);

  removeMessage(message);
}

function removeMessage(message) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
  });

  document.addEventListener('click', () => {
    message.remove();
  });
}

function getSuccessSendMessage() {
  createMessage(successMessageTemplateElement, true);
}

function getFailSendMessage() {
  createMessage(errorMessageTemplateElement);
}

function getFailReceivingMessage() {
  const alert = alertMessageTemplateElement.cloneNode(true);

  alert.querySelector('.alert__message').textContent = ERROR_RECEIVING_TEXT;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
}

export { enableForm, setAddress, getFailReceivingMessage };
