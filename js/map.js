import { renderPopup, setAddress } from './template.js';
import { mainMarkerMoveendHandler } from './handlers.js';
import { START_LAT, START_LNG, MAIN_ICON, ICON } from './config.js';

const map = L.map('map-canvas');
const mainMarker = new Marker(START_LAT, START_LNG, MAIN_ICON);
const markerGroup = L.layerGroup().addTo(map);

function Marker(lat, lng, icon) {
  const markerIcon = L.icon({
    iconUrl: icon.url,
    iconSize: [icon.width, icon.height],
    iconAnchor: [icon.width / 2, icon.height],
  });
  return L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: icon.draggable,
      icon: markerIcon,
    },
  );
}

const initMapAsync = () => new Promise((success) => {
  map.on('load', () => {
    success();
  }).setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 10);

  mainMarker.addTo(map);

  setAddress(START_LAT, START_LNG);

  mainMarker.on('moveend', mainMarkerMoveendHandler);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

});

const clearMap = () => {
  markerGroup.clearLayers();
};

const createMarker = (point) => {
  if (point.location) {
    const { lat, lng } = point.location;
    if (lat && lng) {
      const marker = new Marker(lat, lng, ICON);
      const popup = renderPopup(point);
      marker
        .addTo(markerGroup).bindPopup(popup).on('click', () => {
          marker.openPopup();
        });
    } else {
      throw new Error('Некорректные координаты для метки');
    }
  } else {
    throw new Error('Отсутствуют координаты для метки');
  }
};

const moveMainMarker = (lat, lng) => {
  mainMarker.setLatLng(L.latLng([lat, lng]));
};

export { initMapAsync, clearMap, createMarker, moveMainMarker };
