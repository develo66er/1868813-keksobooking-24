import {
  updatePrice, updateTimeOut, updateTimeIn, updateCapacity, setAddress,
  outputFormSendSuccessMessage, outputFormSendErrorMessage, outputGetAddDataErrorMessage
} from './template.js';
import { getData, postData } from './api.js';
import { setInitState, setFailedState } from './page.js';
import { getFiltersView, setFilter, getFilter, clearFilters } from './filter.js';
import { transformPrice, setupOfferType } from './util.js';
import { createMarker, clearMap } from './map.js';

const handleMinLen = (input, gap) => {
  input.setCustomValidity(`Не хватает ${gap} симв.`);
};

const handleMaxLen = (input, max) => {
  input.setCustomValidity(`Вы можете ввести не более ${max} симв.`);
};

const handleMin = (input, min) => {
  input.setCustomValidity(`Значение не может быть меньше ${min}.`);
};

const handleMax = (input, max) => {
  input.setCustomValidity(`Значение не может быть больше ${max}.`);
};

const handleNoErrors = (input) => {
  input.setCustomValidity('');
};

const textAreaInputHandler = (event) => {
  const textAreaInput = event.target;
  const minLength = textAreaInput.minLength;
  const maxLength = textAreaInput.maxLength;
  const valueLength = textAreaInput.value.length;
  if (valueLength < minLength) {
    handleMinLen(textAreaInput, minLength - valueLength);
  } else if (valueLength >= maxLength) {
    handleMaxLen(textAreaInput, maxLength);
  } else {
    handleNoErrors(textAreaInput);
  }
  textAreaInput.reportValidity();
};

const numberInputHandler = (event) => {
  const numberInput = event.target;
  if (numberInput.type !== 'number') {
    return;
  }
  const min = numberInput.min;
  const max = numberInput.max;
  const value = +numberInput.value;
  if (value < min) {
    handleMin(numberInput, min);
  } else if (value > max) {
    handleMax(numberInput, max);
  } else {
    handleNoErrors(numberInput);
  }
  numberInput.reportValidity();
};

const typeSelectHandler = (event) => {
  const select = event.target;
  const priceInput = select.form.querySelector('#price');
  updatePrice(select.value, priceInput);
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
  setAddress(latLng.lat.toFixed(2), latLng.lng.toFixed(2));
};

const sendAddData = (form) => {
  const body = new FormData(form);
  postData(body)
    .then(() =>
      outputFormSendSuccessMessage())
    .catch(() => outputFormSendErrorMessage());
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

const getAddData = () => getData(outputGetAddDataErrorMessage)
  .then((result) => result.json())
  .then((data) => {
    const filters = getFiltersView();
    if (filters.size > 0) {
      filters.forEach((filterValue, filterKey) => {
        if (Array.isArray(filterValue)) {
          data = data.filter((offerItem) => {
            if (!offerItem.offer[filterKey]) {
              return false;
            }
            return filterValue.every((elem) => offerItem.offer[filterKey].includes(elem));
          });
        } else if (filterValue !== 'any') {
          data = data.filter((offerItem) => {
            if (!isNaN(+filterValue)) {
              filterValue = +filterValue;
            } else if (filterKey === 'price') {
              return transformPrice(offerItem.offer[filterKey], filterValue);
            }
            return offerItem.offer[filterKey] === filterValue;
          });
        }
      });
    }
    return data = data.slice(0, Math.min(data.length, 10));
  })
  .then((offers) => {
    drawMap(offers);
  })
  .catch(() => {
    setFailedState();
    outputGetAddDataErrorMessage();
  });

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  sendAddData(evt.target);
  clearFilters();
  setInitState();
};

const addFormResetHandler = (evt) => {
  evt.preventDefault();
  clearFilters();
  setInitState();
};
const filterFormChangeHandler = (event) => {
  const filterName = event.target.name.replace('housing-', '');
  const filterValue = event.target.value;
  if (event.target.type !== 'checkbox') {
    setFilter(filterName, filterValue);
  } else {
    if (!getFilter(filterName)) {
      setFilter(filterName, [filterValue]);
    } else {
      if (getFilter(filterName).includes(filterValue)) {
        const index = getFilter(filterName).indexOf(filterValue);
        getFilter(filterName).splice(index, 1);
      } else {
        const features = getFilter(filterName);
        setFilter(filterName, [filterValue, ...features]);
      }
    }
  }
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

const removeSuccessPopup = () => {
  const success = document.querySelector('.success');
  success.remove();
};

const removeErrorPopup = () => {
  const error = document.querySelector('.error');
  error.remove();
};

const addDataSendSuccessHandler = (evt) => {
  if (evt.type === 'click') {
    document.removeEventListener('click', addDataSendSuccessHandler);
    removeSuccessPopup();
  } else if (evt.type === 'keydown' && evt.key === 'Escape') {
    document.removeEventListener('keydown', addDataSendSuccessHandler);
    removeSuccessPopup();
  }
};

const addDataSendErrorHandler = (evt) => {
  if (evt.type === 'click') {
    document.removeEventListener('click', addDataSendErrorHandler);
    removeErrorPopup();
  } else if (evt.type === 'keydown' && evt.key === 'Escape') {
    document.removeEventListener('keydown', addDataSendErrorHandler);
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
  textAreaInputHandler,
  numberInputHandler, typeSelectHandler,
  timeInSelectHandler, timeOutSelectHandler,
  roomNumberSelectHandler, mainMarkerMoveendHandler,
  addFormSubmitHandler, addFormResetHandler, getAddData,
  filterFormChangeHandler, addPhotoUploadHandler,
  avatarUploadHandler, addDataSendSuccessHandler,
  addDataSendErrorHandler, addDataGetErrorHandler
};
