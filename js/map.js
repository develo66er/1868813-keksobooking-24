import { renderPopup } from './template.js';
let markerGroup;
export const mapInit = (cb) => {
  /**
     *Реализуйте отображение карты и дальнейший переход страницы в
     активное состояние после инициализации карты.
     */
  const map = L.map('map-canvas');

  const startLat = 35.72;
  const startLng = 139.73;

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: startLat,
      lng: startLng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);

  document.querySelector('#address').value = `${startLat},${startLng}`;
  mainMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    document.querySelector('#address').value = `${latLng.lat.toFixed(2)},${latLng.lng.toFixed(2)}`;
  });

  map.on('load', () => {
    cb();
  }).setView({
    lat: startLat,
    lng: startLng,
  }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerGroup = L.layerGroup().addTo(map);

};

export const createMarker = (point) => {
  if (point.offer
        && point.offer.address) {
    const [lat, lng] = point.offer.address.split(',');
    if (lat && lng) {
      const icon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      const popup = renderPopup(point);
      marker
        .addTo(markerGroup).bindPopup(popup).on('click', () => {
          createMarker(point);
        });
    } else {
      throw new Error('Некорректные координаты для метки');
    }
  } else {
    throw new Error('Отсутствуют координаты для метки');
  }
};
