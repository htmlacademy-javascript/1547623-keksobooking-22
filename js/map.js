import { addressElement, formFilterElement, formAdvertElement, fieldAdvertElements, housingFilterElements, housingFeatureElement } from './form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    formFilterElement.classList.remove('map__filters--disabled');
    formAdvertElement.classList.remove('ad-form--disabled');

    fieldAdvertElements.forEach((item) => item.removeAttribute('disabled'));
    housingFilterElements.forEach((item) => item.removeAttribute('disabled'));
    housingFeatureElement.removeAttribute('disabled');
  })
  .setView({ lat: 35.68951, lng: 139.69201 }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const pinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});

const mainPinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon-2x.png',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
});

const mainMarker = L.marker({ lat: 35.68951, lng: 139.69201 }, { draggable: true, icon: mainPinIcon });

mainMarker.addTo(map);

addressElement.setAttribute('readonly', '');
addressElement.value = '35.68951, 139.69201';

export { map, pinIcon, mainMarker };
