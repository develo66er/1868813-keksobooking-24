import {
  updatePrice, updateTimeOut, updateTimeIn, updateCapacity, setAddress,
  outputFormSendSuccessMessage, outputGetAddDataErrorMessage
} from './template.js';
import { getData } from './api.js';
import { setInitState, resetState } from './page.js';
import { transformPrice, setupOfferType, isEscape } from './util.js';
import { createMarker, clearMap } from './map.js';

const typeSelectHandler = (event) => {
  const select = event.target;
  const priceInput = select.form.querySelector('#price');
  updatePrice(select.value, priceInput);
  priceInput.style.border = 'none';
  priceInput.reportValidity();
};

const timeInSelectHandler = (event) => {
  const timein = event.target;
  const timeout = timein.form.querySelector('#timeout');
  updateTimeOut(timeout, timein);
};

const timeOutSelectHandler = (event) => {
  const timeout = event.target;
  const timein = timeout.form.querySelector('#timein');
  updateTimeIn(timein, timeout);
};

const roomNumberSelectHandler = (event) => {
  const roomNumberSelect = event.target;
  const capacity = roomNumberSelect.form.querySelector('#capacity');
  updateCapacity(roomNumberSelect.value, capacity);
};

const mainMarkerMoveendHandler = (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat;
  const lng = latLng.lng;
  setAddress(lat, lng);
};

const drawMap = (offers) => {
  offers.forEach((offerItem) => {
    try {
      setupOfferType(offerItem);
      createMarker(offerItem);
    } catch (error) {
      error.message;
    }
  });
};

const filterByType = (type,typeValue) => (typeValue === 'any') || (type === typeValue);
const filterByPrice = (price,priceValue) => (priceValue === 'any') || (transformPrice(price, priceValue));
const filterByRoomsNumber = (roomsNumber,roomsValue) => (roomsValue === 'any') || (roomsNumber === roomsValue);
const filterByGuestsNumber = (guestsNumber,guestsValue) => (guestsValue === 'any') || (guestsNumber === guestsValue);
const filterByFeatures = (features,featuresValues) => {
  if(!features){
    return false;
  }
  return (!featuresValues || featuresValues.length === 0) || (featuresValues.every((elem) => features.includes(elem)));
};

const getAddData = () => getData((json) => {
  json.then((data) => {
    const dataItems = [];
    const typeValue = document.querySelector('#housing-type').value;
    const priceValue = document.querySelector('#housing-price').value;
    const roomsValue = document.querySelector('#housing-rooms').value;
    const guestsValue = document.querySelector('#housing-guests').value;
    const features = Array.from(document.querySelectorAll('#housing-features input[type="checkbox"]'));
    const featuresValues = features.map((feature)=>feature.value);
    for (let index = 0; dataItems.length < 10 && index < data.length; index++) {
      const byType = filterByType(data[index].offer.type,typeValue);
      const byPrice = filterByPrice(data[index].offer.price,priceValue);
      const byRoomsNumber = filterByRoomsNumber(data[index].offer.rooms,roomsValue);
      const byGuestsNumber = filterByGuestsNumber(data[index].offer.guests,guestsValue);
      const byFeatures = filterByFeatures(data[index].offer.features,featuresValues);
      if (byType && byPrice
        && byRoomsNumber
        && byGuestsNumber
        && byFeatures) {
        dataItems.push(data[index]);
      }
    }
    return dataItems;
  }).then((offers) => {
    drawMap(offers);
  }).catch(() => {
    outputGetAddDataErrorMessage('данные полученны не были');
  });
}, outputGetAddDataErrorMessage);

const addFormResetHandler = (evt) => {
  evt.preventDefault();
  setInitState();
};

const filterFormChangeHandler = () => {
  clearMap();
  getAddData();
};

const addPhotoUploadHandler = (event) => {
  const files = event.target.files;
  if (files) {
    const imageContainer = document.querySelector('.ad-form__photo-container');
    for (const file of files) {
      const imageTemplate = document.querySelector('#ad-form__photo').content;
      const imageBox = imageTemplate.querySelector('.ad-form__photo').cloneNode(true);
      const image = imageBox.querySelector('img');
      image.src = window.URL.createObjectURL(file);
      imageContainer.appendChild(imageBox);
    }
  }
};

const avatarUploadHandler = (event) => {
  const files = event.target.files;
  if (files) {
    const image = document.querySelector('.ad-form-header__preview>img');
    image.src = window.URL.createObjectURL(files[0]);
  }
};
const outputFormSendSuccessMessageHandler = () => {
  outputFormSendSuccessMessage();
  resetState();
};
const removeSuccessPopup = () => {
  const success = document.querySelector('.success');
  success.remove();
};

const removeErrorPopup = () => {
  const error = document.querySelector('.error');
  error.remove();
};

const addDataSendSuccessHandler = (evt) => {
  if (evt.type === 'click' || (evt.type === 'keydown' && isEscape(evt.key))) {
    document.removeEventListener('click', addDataSendSuccessHandler);
    document.removeEventListener('keydown', addDataSendSuccessHandler);
    removeSuccessPopup();
  }
};

const addDataSendErrorHandler = (evt) => {
  if (evt.type === 'click' || (evt.type === 'keydown' && isEscape(evt.key))) {
    document.removeEventListener('keydown', addDataSendErrorHandler);
    document.removeEventListener('click', addDataSendErrorHandler);
    document.querySelector('.error__button').removeEventListener('click', addDataSendErrorHandler);
    removeErrorPopup();
  }
};

const addDataGetErrorHandler = () => {
  const errorMessage = document.querySelector('.get-data_error');
  errorMessage.classList.add('hidden');
  errorMessage.removeEventListener('click', addDataGetErrorHandler);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.classList.remove('hidden');
  setInitState();
};

export {
  typeSelectHandler,
  timeInSelectHandler, timeOutSelectHandler,
  roomNumberSelectHandler, mainMarkerMoveendHandler,
  addFormResetHandler, getAddData,
  filterFormChangeHandler, addPhotoUploadHandler,
  avatarUploadHandler, addDataSendSuccessHandler,
  addDataSendErrorHandler, addDataGetErrorHandler,
  outputFormSendSuccessMessageHandler
};
