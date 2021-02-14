import './data.js';
import './popup.js';
import './form.js';
import { createCardsMarkup } from './popup.js';
import { createAdverts } from './data.js';

const map = document.querySelector('.map__canvas');
const adverts = createAdverts();
const cardsMarkup = createCardsMarkup(adverts);

map.appendChild(cardsMarkup);
