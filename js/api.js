import { setHouseTypeFilter } from './form.js';

const RECEIVING_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SENDING_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

function getData(onSuccess, onFail) {
  fetch(RECEIVING_DATA_URL)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
      setHouseTypeFilter(data);
    })
    .catch(() => {
      onSuccess();
      onFail();
    });
}

function sendData(onSuccess, onFail, body) {
  fetch(SENDING_DATA_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
}

export { getData, sendData };
