import {textAreaHandler,numberInputHandler,selectTypeListHandler,selectTimeInListHandler,
  selectTimeOutListHandler,selectRoomNumberHandler} from './handlers.js';
import {updatePrice,updateTimeOut,updateCapacity} from './util.js';
import {postData} from './api.js';
export const setFormInactive = (formClassName) => {
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
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};
export const setFormActiveAsync =(formClassName)=>new Promise((onSuccess) => {
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
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  onSuccess();
});

export const validateFormAsync = (formSelector)=>new Promise((onSuccess)=>{
  const requiredFields = document.querySelector(`.${formSelector}`).querySelectorAll('[required]');
  requiredFields.forEach((input)=>{
    const type = input.type;
    if(type==='textarea'){
      input.addEventListener('input',textAreaHandler);
    }else if(type==='number'){
      input.addEventListener('input',numberInputHandler);
    }
  });
  onSuccess();
});


const setupAdForm = (form)=>{
  /**
 * Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
 */
  const typeSelect  = form.querySelector('#type');
  typeSelect.value = 'flat';
  const priceInput = form.querySelector('#price');
  priceInput.value = '';
  updatePrice(typeSelect,priceInput);
  typeSelect.addEventListener('change', selectTypeListHandler);
  /**
   * Поля «Время заезда» и «Время выезда» синхронизированы:
   * при изменении значения одного поля во втором выделяется соответствующее ему значение.
   * Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
   */
  const timeInSelect = form.querySelector('#timein');
  const timeOutSelect = form.querySelector('#timeout');
  timeInSelect.value ='12:00';
  updateTimeOut(timeInSelect,timeOutSelect);
  timeInSelect.addEventListener('change', selectTimeInListHandler);
  timeOutSelect.addEventListener('change', selectTimeOutListHandler);
  /**
   * Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
   * что при выборе количества комнат вводятся ограничения на допустимые варианты выбора
   *  количества гостей:
   */
  const roomNumberSelect = form.querySelector('#room_number');
  roomNumberSelect.value = '1';
  const roomNumber = roomNumberSelect.value;
  const capacity = form.querySelector('#capacity');
  updateCapacity(roomNumber,capacity);
  roomNumberSelect.addEventListener('change', selectRoomNumberHandler);
};
const closeOkPopup = (evt)=>{
  evt.target.remove();
};

const closeErrorPopup = (evt)=>{
  evt.target.parentNode.remove();
};
const sendData = (form)=>{
  const body  = new FormData(form);
  postData(()=>{
    const message = document.querySelector('.message');
    const successMessageTemplate = document.querySelector('#success').content;
    const success = successMessageTemplate.querySelector('.success').cloneNode(true);
    message.appendChild(success);
    success.addEventListener('click',closeOkPopup);
  },()=>{
    const message = document.querySelector('.message');
    const errorMessageTemplate = document.querySelector('#error').content;
    const error = errorMessageTemplate.querySelector('.error').cloneNode(true);
    message.append(error);
    const errorButton = error.querySelector('.error__button');
    errorButton.addEventListener('click',closeErrorPopup);
  },body);
  setupAdForm(form);
};
const submitHandler  = (evt)=>{
  evt.preventDefault();
  sendData(evt.target);
};
const resetHandler = (evt)=>{
  evt.target.form.reset();
};

export const initAdForm = (formClassName)=>{
  const form = document.querySelector(`.${formClassName}`);
  setupAdForm(form);
  form.addEventListener('submit',submitHandler);
  form.querySelector('.ad-form__reset').addEventListener('click',resetHandler);
};
