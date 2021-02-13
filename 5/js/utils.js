function getRandomInteger(from, to) {
  if (to > from && from >= 0) {
    return Math.round(from - 0.5 + Math.random() * (to - from + 1));
  }

  throw new Error('Input data error');
}

function getRandomFloat(from, to, decimal = 2) {
  if (to > from && from >= 0) {
    return +(Math.random() * (to - from) + from).toFixed(decimal);
  }

  throw new Error('Input data error');
}

function getZeroFirst(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function fillArray(array, values) {
  const newArray = [];
  for (let i = 0; i < values; i++) {
    newArray.push(array[i]);
  }

  return newArray;
}

function getTypeHouse(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

function checkGuests(guests) {
  return guests > 1 ? guests + ' гостей' : guests + ' гостя';
}

function checkRooms(rooms) {
  return rooms > 1 ? rooms + ' комнаты' : rooms + ' комната';
}

export {
  getRandomInteger,
  getRandomFloat,
  getZeroFirst,
  getRandomArrayElement,
  fillArray,
  getTypeHouse,
  checkRooms,
  checkGuests,
};
