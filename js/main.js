import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import './api.js';
import { initMap } from './map.js';
import { getData } from './api.js';
import { getFailReceivingMessage } from './form.js';

getData(initMap, getFailReceivingMessage);
