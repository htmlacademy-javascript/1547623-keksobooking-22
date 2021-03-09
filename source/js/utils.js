import { resetUserActions } from './form.js';

const ERROR_RECEIVING_TEXT = 'Не удалось загрузить объявления. Попробуйте перезагрузить страницу';
const ALERT_SHOW_TIME = 5000;

const mainElement = document.querySelector('.main');
const successMessageTemplateElement = document.querySelector('.template-success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('.template-error').content.querySelector('.error');
const alertMessageTemplateElement = document.querySelector('.template-alert').content.querySelector('.alert');

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

function createMessage(template, reset) {
  const message = template.cloneNode(true);

  if (reset) {
    resetUserActions();
  }

  mainElement.appendChild(message);

  removeMessage(message);
}

function removeMessage(message) {
  document.addEventListener(
    'keydown',
    function (evt) {
      if (evt.key === 'Escape') {
        message.remove();
      }
    },
    { once: true }
  );

  document.addEventListener(
    'click',
    function () {
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

  setTimeout(function () {
    alert.remove();
  }, ALERT_SHOW_TIME);
}

function debounce(fn, ms) {
  let timeout;

  return function () {
    function fnCall() {
      fn.apply(this, arguments);
    }

    clearTimeout(timeout);

    timeout = setTimeout(fnCall, ms);
  };
}

export { declOfNum, createFailReceivingMessage, createSuccessSendMessage, createFailSendMessage, debounce };
