import {
  textAreaInputHandler, numberInputHandler,
  typeSelectHandler, timeInSelectHandler,
  timeOutSelectHandler, roomNumberSelectHandler,
  addFormSubmitHandler, addFormResetHandler,
  addPhotoUploadHandler, avatarUploadHandler
} from './handlers.js';
import {
  updatePrice, updateTimeOut, updateCapacity,
  clearAddImages, clearAvatarImage
} from './template.js';
import { ADD_FORM_INIT_VALUES } from './config.js';


const setFormInactive = (formClassName) => {
  const form = document.querySelector(`.${formClassName}`);
  /**
     * Форма заполнения информации об объявлении .${formClassName} содержит класс ${formClassName}--disabled;
     */
  form.classList.add(`${formClassName}--disabled`);
  /**
     * Все интерактивные элементы формы .${formClassName} должны быть заблокированы
     * с помощью атрибута disabled,
     *  добавленного на них или на их родительские блоки fieldset;
     */
  const fieldsetList = form.querySelectorAll('fieldset');
  form.querySelectorAll('select').forEach((select) => select.disabled = true);
  form.querySelectorAll('input').forEach((select) => select.disabled = true);
  form.querySelectorAll('button').forEach((select) => select.disabled = true);
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const setFormActive = (formClassName) => {
  const form = document.querySelector(`.${formClassName}`);
  /**
       * Форма заполнения информации об объявлении .${formClassName} содержит класс ${formClassName}--disabled;
       */
  form.classList.remove(`${formClassName}--disabled`);
  /**
       * Все интерактивные элементы формы .${formClassName} должны быть разблокированы
       * с помощью атрибута disabled=false,
       *  добавленного на них или на их родительские блоки fieldset;
       */
  const fieldsetList = form.querySelectorAll('fieldset');
  form.querySelectorAll('select').forEach((select) => select.disabled = false);
  form.querySelectorAll('input').forEach((select) => select.disabled = false);
  form.querySelectorAll('button').forEach((select) => select.disabled = false);
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const setupValidation = (formSelector) => {
  const requiredFields = document.querySelector(`.${formSelector}`).querySelectorAll('[required]');
  requiredFields.forEach((input) => {
    const type = input.type;
    if (type === 'textarea') {
      input.addEventListener('input', textAreaInputHandler);
    } else if (type === 'number') {
      input.addEventListener('input', numberInputHandler);
    }
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
  const priceInput = form.querySelector('#price');
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
  form.addEventListener('submit', addFormSubmitHandler);
  form.addEventListener('reset', addFormResetHandler);
};

const setupFilterForm = () => {
  const form = document.querySelector('.map__filters');
  form.querySelectorAll('select').forEach((select) => {
    select.value = 'any';
  });
  resetFeatures(form, '#housing-features');
};

export { setFormInactive, setFormActive, setupValidation, setupAdForm, setupFilterForm };

