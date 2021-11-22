import {
  typeSelectHandler, timeInSelectHandler,
  timeOutSelectHandler, roomNumberSelectHandler,
  addPhotoUploadHandler, avatarUploadHandler,filterFormChangeHandler
} from './handlers.js';
import {
  updatePrice, updateTimeOut, updateCapacity,
  clearAddImages, clearAvatarImage
} from './template.js';
import {postData} from './api.js';
import { ADD_FORM_INIT_VALUES } from './config.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const addForm = document.querySelector('.ad-form');
titleInput.style.border = '3px solid red';
priceInput.style.border = '3px solid red';

const setupFormInactiveState = (formClassName,disabled)=>{
  const form = document.querySelector(`.${formClassName}`);
  if(disabled){
    form.classList.add(`${formClassName}--disabled`);
  }else{
    form.classList.remove(`${formClassName}--disabled`);
  }
  const fieldsetList = form.querySelectorAll('fieldset');
  form.querySelectorAll('select').forEach((select) => select.disabled = disabled);
  form.querySelectorAll('input').forEach((select) => select.disabled = disabled);
  form.querySelectorAll('button').forEach((select) => select.disabled = disabled);
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = disabled;
  });
};

titleInput.addEventListener('invalid', () => {
  titleInput.style.border = '3px solid red';
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.style.border = 'none';
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('invalid', () => {
  priceInput.style.border = '3px solid red';
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

priceInput.addEventListener('input', () => {
  const value = +priceInput.value;
  const priceMin = priceInput.min;
  const priceMax = priceInput.max;
  priceInput.style.border = 'none';
  if (value < priceMin) {
    priceInput.setCustomValidity(`Значение поля не может быть меньше ${priceMin}.`);
  } else if (value > priceMax) {
    priceInput.setCustomValidity(`Значение поля не может быть больше ${priceMax}.`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const setAddFormSubmit = (onSuccess,onError)=>{
  addForm.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    postData(
      () => onSuccess(),
      (message) => onError(message),
      new FormData(evt.target),
    );
  });
};

const resetFeatures = (form, selector) => {
  form.querySelector(selector).childNodes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
};

const setupAdForm = () => {
  const form = document.querySelector('.ad-form');
  ADD_FORM_INIT_VALUES.forEach((value, id) => {
    form.querySelector(`#${id}`).value = value;
  });
  resetFeatures(form, '#features');
  const typeSelect = form.querySelector('#type');
  typeSelect.value = 'flat';
  updatePrice('flat', priceInput);
  const timeInSelect = form.querySelector('#timein');
  const timeOutSelect = form.querySelector('#timeout');
  timeInSelect.value = '12:00';
  updateTimeOut(timeOutSelect, timeInSelect);
  const roomNumberSelect = form.querySelector('#room_number');
  roomNumberSelect.value = '1';
  const roomNumber = roomNumberSelect.value;
  const capacity = form.querySelector('#capacity');
  updateCapacity(roomNumber, capacity);
  const avatarPhoto = document.querySelector('#avatar');
  avatarPhoto.value = '';
  clearAvatarImage();
  const addPhoto = document.querySelector('#images');
  addPhoto.value = '';
  clearAddImages();
  avatarPhoto.addEventListener('change', avatarUploadHandler);
  addPhoto.addEventListener('change', addPhotoUploadHandler);
  timeInSelect.addEventListener('change', timeInSelectHandler);
  timeOutSelect.addEventListener('change', timeOutSelectHandler);
  typeSelect.addEventListener('change', typeSelectHandler);
  roomNumberSelect.addEventListener('change', roomNumberSelectHandler);
};

const setupFilterForm = () => {
  const form = document.querySelector('.map__filters');
  form.querySelectorAll('select').forEach((select) => {
    select.value = 'any';
  });
  resetFeatures(form, '#housing-features');
  form.addEventListener('change',filterFormChangeHandler);
};

export {setupFormInactiveState, setAddFormSubmit, setupAdForm, setupFilterForm };

