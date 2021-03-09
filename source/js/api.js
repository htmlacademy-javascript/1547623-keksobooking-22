function getData(url, onSuccess, onFail) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      onSuccess(data);
    })
    .catch(function () {
      onFail();
    });
}

function sendData(url, onSuccess, onFail, body) {
  fetch(url, {
    method: 'POST',
    body,
  })
    .then(function (response) {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(function () {
      onFail();
    });
}

export { getData, sendData };
