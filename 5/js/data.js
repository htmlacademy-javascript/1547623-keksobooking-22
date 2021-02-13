import {
  getRandomInteger,
  getRandomFloat,
  getZeroFirst,
  getRandomArrayElement,
  fillArray,
} from './utils.js';

const ADVERTISEMENT_COUNT = 1;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const MIN_ROOM = 1;
const MAX_ROOM = 3;
const MIN_GUEST = 1;
const MAX_GUEST = 3;
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
const MIN_ELEMENT = 1;

function createAdvertisement() {
  const locationX = getRandomFloat(35.65, 35.7, 5);
  const locationY = getRandomFloat(139.7, 139.8, 5);
  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(0, 8))}.png`,
    },
    offer: {
      title: TITLE,
      address: `${locationX}, ${locationY}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(HOUSE_TYPES),
      rooms: getRandomInteger(MIN_ROOM, MAX_ROOM),
      guests: getRandomInteger(MIN_GUEST, MAX_GUEST),
      checkin: getRandomArrayElement(REGISTRATIONS),
      checkout: getRandomArrayElement(DEPARTURES),
      features: fillArray(
        FEATURES,
        getRandomInteger(MIN_ELEMENT, FEATURES.length),
      ),
      description: DESCRIPTION,
      photos: fillArray(PHOTOS, getRandomInteger(MIN_ELEMENT, PHOTOS.length)),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
}

function createAdvertisements() {
  return new Array(ADVERTISEMENT_COUNT)
    .fill(null)
    .map(() => createAdvertisement());
}

export { createAdvertisements };
