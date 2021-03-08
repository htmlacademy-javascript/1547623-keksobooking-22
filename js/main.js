import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import './api.js';
import './filter.js';
import './photo.js';
import { initMap, setAdverts } from './map.js';
import { getData, sendData } from './api.js';
import { userFormElement } from './form.js';
import { createFailReceivingMessage, createSuccessSendMessage, createFailSendMessage } from './utils.js';

const RECEIVING_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SENDING_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

getData(
  RECEIVING_DATA_URL,
  (data) => {
    initMap();
    setAdverts(data);
  },
  () => {
    initMap();
    createFailReceivingMessage();
  }
);

userFormElement.addEventListener('submit', onUserFormElementSubmit);

function onUserFormElementSubmit(evt) {
  evt.preventDefault();
  sendData(SENDING_DATA_URL, createSuccessSendMessage, createFailSendMessage, new FormData(evt.target));
}
