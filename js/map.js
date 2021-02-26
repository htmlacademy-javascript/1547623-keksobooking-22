import { enableForm, setAddress } from './form.js';
import { createCardsMarkup } from './popup.js';

const MAP_COORDINATES = {
  lat: 35.68951,
  lng: 139.69201,
};
const MAIN_ICON_WIDTH = 50;
const MAIN_ICON_HEIGHT = 82;
const ICON_WIDTH = 25;
const ICON_HEIGHT = 41;
const VIEW_DISTANCE = 10;

function initMap(adverts) {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableForm();
      setAddress(MAP_COORDINATES);
    })
    .setView(MAP_COORDINATES, VIEW_DISTANCE);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../leaflet/images/marker-icon-2x.png',
    iconSize: [MAIN_ICON_WIDTH, MAIN_ICON_HEIGHT],
    iconAnchor: [MAIN_ICON_WIDTH / 2, MAIN_ICON_HEIGHT],
  });

  const pinIcon = L.icon({
    iconUrl: '../leaflet/images/marker-icon-2x.png',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
  });

  const mainMarker = L.marker(MAP_COORDINATES, { draggable: true, icon: mainPinIcon });

  mainMarker.on('move', (evt) => {
    setAddress(evt.target.getLatLng());
  });

  mainMarker.addTo(map);

  try {
    adverts.forEach((item) => {
      const marker = L.marker({ lat: item.location.lat, lng: item.location.lng }, { icon: pinIcon });
      marker.addTo(map).bindPopup(createCardsMarkup([item]).cloneNode(true).firstChild);
    });
  } catch (err) {}

  return map;
}

export { initMap, MAP_COORDINATES };
