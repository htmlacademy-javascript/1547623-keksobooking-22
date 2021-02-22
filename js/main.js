import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import { createAdverts } from './data.js';
import { initMap } from './map.js';

const adverts = createAdverts();
initMap(adverts);
