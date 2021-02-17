import { getRandomInteger, getRandomFloat, getZeroFirst, getRandomArrayElement, fillArray } from './utils.js';

const MIN_USER_AVATAR = 1;
const MAX_USER_AVATAR = 8;
const MIN_COORDINATE_X = 35.65;
const MAX_COORDINATE_X = 35.7;
const MIN_COORDINATE_Y = 139.7;
const MAX_COORDINATE_Y = 139.8;
const ADVERT_COUNT = 10;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const OFFERS_LABELS = {
  palace: {
    type: 'Дворец',
    price: 10000,
  },
  flat: {
    type: 'Квартира',
    price: 1000,
  },
  house: {
    type: 'Дом',
    price: 5000,
  },
  bungalow: {
    type: 'Бунгало',
    price: 0,
  },
};
const MIN_ROOM = 1;
const MAX_ROOM = 3;
const MIN_GUEST = 1;
const MAX_GUEST = 3;
const REGISTRATIONS = ['12:00', '13:00', '14:00'];
const DEPARTURES = ['12:00', '13:00', '14:00'];
const TITLE = 'отель СПб';
const DESCRIPTION = 'уютный дом для всех';
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MIN_ELEMENT = 1;

const houseTypes = Object.keys(OFFERS_LABELS);

function createAdvert() {
  const locationX = getRandomFloat(MIN_COORDINATE_X, MAX_COORDINATE_X);
  const locationY = getRandomFloat(MIN_COORDINATE_Y, MAX_COORDINATE_Y);

  return {
    author: {
      avatar: `img/avatars/user${getZeroFirst(getRandomInteger(MIN_USER_AVATAR, MAX_USER_AVATAR))}.png`,
    },
    offer: {
      title: TITLE,
      address: `${locationX}, ${locationY}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(houseTypes),
      rooms: getRandomInteger(MIN_ROOM, MAX_ROOM),
      guests: getRandomInteger(MIN_GUEST, MAX_GUEST),
      checkin: getRandomArrayElement(REGISTRATIONS),
      checkout: getRandomArrayElement(DEPARTURES),
      features: fillArray(FEATURES, getRandomInteger(MIN_ELEMENT, FEATURES.length)),
      description: DESCRIPTION,
      photos: fillArray(PHOTOS, getRandomInteger(MIN_ELEMENT, PHOTOS.length)),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
}

function createAdverts() {
  return new Array(ADVERT_COUNT).fill(null).map(() => createAdvert());
}

export { createAdverts, OFFERS_LABELS };
