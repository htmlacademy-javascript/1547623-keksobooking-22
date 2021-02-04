'use strict';

const ADVERTISEMENT_COUNT = 10;
const HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const REGISTRATIONS = ['12:00', '13:00', '14:00'];
const DEPARTURES = ['12:00', '13:00', '14:00'];
const TITLE = 'отель СПб';
const DESCRIPTION = 'уютный дом для всех';
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

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

function createAdvertisement() {
  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(0, 8))}.png`,
    },
    offer: {
      title: TITLE,
      address: `${getRandomFloat(100, 1000)}, ${getRandomFloat(100, 1000)}`,
      price: getRandomInteger(0, 1000000),
      type: getRandomArrayElement(HOUSE_TYPES),
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 3),
      checkin: getRandomArrayElement(REGISTRATIONS),
      checkout: getRandomArrayElement(DEPARTURES),
      features: fillArray(FEATURES, getRandomInteger(1, FEATURES.length)),
      description: DESCRIPTION,
      photos: fillArray(PHOTOS, getRandomInteger(1, PHOTOS.length)),
    },
    location: {
      x: getRandomFloat(35.65, 35.7, 5),
      y: getRandomFloat(139.7, 139.8, 5),
    },
  };
}

const advertisements = new Array(ADVERTISEMENT_COUNT).fill(null).map(() => {
  return createAdvertisement();
});

advertisements;
