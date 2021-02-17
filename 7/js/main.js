import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import { createCardsMarkup } from './popup.js';
import { createAdverts } from './data.js';
import { map, pinIcon, mainMarker } from './map.js';
import { addressElement } from './form.js';

const adverts = createAdverts();

mainMarker.on('move', (evt) => {
  addressElement.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

for (let i = 0; i < adverts.length; i++) {
  const marker = L.marker({ lat: adverts[i].location.x, lng: adverts[i].location.y }, { icon: pinIcon });
  marker.addTo(map).bindPopup(createCardsMarkup([adverts[i]]).cloneNode(true).firstChild);
}
