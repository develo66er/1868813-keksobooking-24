import {createOffers} from './data.js';
import {renderPopup} from './template.js';
import {setFormInactive, setFormActive,validateForm,setupAdForm} from './form.js';

//const popup  = renderPopup(offers[0]);
/**
 * синхронизация полей формы
 */
setupAdForm('ad-form');
/**
  * При открытии страница находится в неактивном состоянии:
  */
/**
  *Форма .ad-form заблокирована —
  * на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
  */
setFormInactive('ad-form');
/**
  * Форма с фильтрами .map__filters заблокирована-
  * на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
  */
setFormInactive('map__filters');
/**
 *Реализуйте отображение карты и дальнейший переход страницы в
 активное состояние после инициализации карты.
 * Координаты центра Токио найдите самостоятельно.
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

document.querySelector('#address').value  = `${startLat },${startLng}`;
mainMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  document.querySelector('#address').value  = `${latLng.lat.toFixed(2) },${latLng.lng.toFixed(2)}`;
});

map.on('load', () => {
  setFormActive('ad-form');
  setFormActive('map__filters');
  //Добавление пользовательских валидаций формы ввода объявления
  validateForm('.ad-form');
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


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  if(!point.offer
    || !point.offer.address
     || point.offer.address.split(',').lenght!==2){
    throw new Error('Некорректные координаты для метки');
  }
  const [lat, lng] = point.offer.address.split(',');
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
    .addTo(markerGroup).bindPopup(popup).on('click',()=>{
      createMarker(point);
    });
};

const offerArray = createOffers();
offerArray.forEach((offerItem)=>{
  try{
    createMarker(offerItem);
  }catch(error){
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
});
