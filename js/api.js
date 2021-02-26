function getData(onSuccess, onFail) {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      onSuccess();
      onFail();
    });
}

function sendData(onSuccess, onFail, body) {
  fetch('https://22.javascript.pages.academy/keksobooking', {
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
