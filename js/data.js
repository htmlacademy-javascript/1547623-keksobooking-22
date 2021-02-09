import {
  getRandomInteger,
  getRandomFloat,
  getZeroFirst,
  getRandomArrayElement,
  fillArray,
} from './utils.js';

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

const locationX = getRandomFloat(35.65, 35.7, 5);
const locationY = getRandomFloat(139.7, 139.8, 5);

function createAdvertisement() {
  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(0, 8))}.png`,
    },
    offer: {
      title: TITLE,
      address: `${locationX}, ${locationY}`,
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
      x: locationX,
      y: locationY,
    },
  };
}

const advertisements = new Array(ADVERTISEMENT_COUNT).fill(null).map(() => {
  return createAdvertisement();
});

advertisements;
