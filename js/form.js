import {textAreaHandler,numberInputHandler,selectTypeListHandler,selectTimeInListHandler,
  selectTimeOutListHandler,selectRoomNumberHandler} from './handlers.js';
import {updatePrice,updateTimeOut,updateCapacity} from './util.js';

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
export const setFormActive = (formClassName) => {
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
};

export const validateForm = (formSelector)=>{
  const requiredFields = document.querySelector(formSelector).querySelectorAll('[required]');
  requiredFields.forEach((input)=>{
    const type = input.type;
    if(type==='textarea'){
      input.addEventListener('input',textAreaHandler);
    }else if(type==='number'){
      input.addEventListener('input',numberInputHandler);
    }
  });
};

export const setupAdForm = (formClassName)=>{
  const form = document.querySelector(`.${formClassName}`);
  /**
 * Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
 */
  const typeSelect  = form.querySelector('#type');
  const priceInput = form.querySelector('#price');
  updatePrice(typeSelect,priceInput);
  typeSelect.addEventListener('change', selectTypeListHandler);
  /**
   * Поля «Время заезда» и «Время выезда» синхронизированы:
   * при изменении значения одного поля во втором выделяется соответствующее ему значение.
   * Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
   */
  const timeInSelect = form.querySelector('#timein');
  const timeOutSelect = form.querySelector('#timeout');
  updateTimeOut(timeInSelect,timeOutSelect);
  timeInSelect.addEventListener('change', selectTimeInListHandler);
  timeOutSelect.addEventListener('change', selectTimeOutListHandler);
  /**
   * Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
   * что при выборе количества комнат вводятся ограничения на допустимые варианты выбора
   *  количества гостей:
   */
  const roomNumberSelect = form.querySelector('#room_number');
  const roomNumber = roomNumberSelect.value;
  const capacity = form.querySelector('#capacity');
  updateCapacity(roomNumber,capacity);
  roomNumberSelect.addEventListener('change', selectRoomNumberHandler);
};
