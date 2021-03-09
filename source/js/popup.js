import { OFFERS_LABELS } from './data.js';
import { declOfNum } from './utils.js';

const TEXT_FORM_ROOMS = ['комната', 'комнаты', 'комнат'];
const TEXT_FORM_GUESTS = ['гостя', 'гостей', 'гостей'];

const cardTemplateElement = document.querySelector('.card').content.querySelector('.popup');

function createCardsMarkup(array) {
  const cardListFragment = document.createDocumentFragment();

  array.forEach(({ author, offer }) => {
    const cardElement = cardTemplateElement.cloneNode(true);
    const featureListElement = cardElement.querySelector('.popup__features');
    const photoListElement = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__avatar').src = author.avatar;
    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent = OFFERS_LABELS[offer.type].type;
    cardElement.querySelector('.popup__description').textContent = offer.description;
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declOfNum(offer.rooms, TEXT_FORM_ROOMS)} для ${offer.guests} ${declOfNum(offer.guests, TEXT_FORM_GUESTS)}`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    featureListElement.innerHTML = '';
    photoListElement.innerHTML = '';

    offer.features.forEach((item) => {
      const feature = document.createElement('li');
      const featureClass = `popup__feature--${item}`;
      feature.classList.add('popup__feature', featureClass);
      featureListElement.appendChild(feature);
    });

    offer.photos.forEach((item) => {
      const photoElement = cardTemplateElement.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = item;
      photoListElement.appendChild(photoElement);
    });

    cardListFragment.appendChild(cardElement);
  });

  return cardListFragment;
}

export { createCardsMarkup };
