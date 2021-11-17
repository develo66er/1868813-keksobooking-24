import { setFormInactive, setFormActiveAsync, validateFormAsync, initAdForm } from './form.js';
import {mapInitAsync, createMarker,clearMap} from './map.js';
import {getDataAsync} from './api.js';
import {setupFiltersAsync} from './filter.js';
/**
 * синхронизация полей формы
 */
initAdForm('ad-form');
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
 * Форма, с помощью которой производится фильтрация похожих объявлений
 * на момент открытия страницы, заблокирована и
 * становится доступной только после окончания загрузки
 *  всех похожих объявлений, которые в свою очередь начинают
 * загружаться только после загрузки и успешной инициализации карты.

 */
const drawMapCallback = (offers)=>{
  offers.forEach((offerItem) => {
    try {
      createMarker(offerItem);
    } catch (error) {
      error.message;
    }
  });
};
mapInitAsync()
  .then(()=>getDataAsync())
  .then((offers)=>drawMapCallback(offers))
  .then(()=>setFormActiveAsync('ad-form'))
  .then(()=> validateFormAsync('ad-form'))
  .then(()=> setFormActiveAsync('map__filters'))
  .then(()=>setupFiltersAsync(()=>{
    clearMap();
    getDataAsync().then((offers)=>drawMapCallback(offers));
  }))
  .catch((error)=>{
    error.message;
  });

