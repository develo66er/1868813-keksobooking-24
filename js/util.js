import { HouseTypes } from './house-types.js';

export const getRandomInteger = (from, to) => {

  if (from < 0) {
    throw new Error('Начальное значение диапазона не может быть меньше 0');
  }
  if (to < 0) {
    throw new Error('Конечное значение диапазона не может быть меньше 0');
  }

  if (from > to) {
    throw new Error('Начальное значение диапазона не может быть больше конечного');
  }

  if (from === to) {
    throw new Error('Начальное значение диапазона не может быть равно конечному');
  }

  return Math.floor(Math.random() * (to - from + 1) + from);

};


export const getRandomFloat = (from, to, decimalPlacesNumber) => {

  if (from < 0) {
    throw new Error('Начальное значение диапазона не может быть меньше 0');
  }

  if (to < 0) {
    throw new Error('Конечное значение диапазона не может быть меньше 0');
  }

  if (from > to) {
    throw new Error('Начальное значение диапазона не может быть больше конечного');
  }

  if (from === to) {
    throw new Error('Начальное значение диапазона не может быть равно конечному');
  }

  const randomFloat = Math.random() * (to - from + 1) + from;

  return parseFloat(randomFloat.toFixed(decimalPlacesNumber));
};


export const shuffle = (array) => {

  for (let index = array.length - 1; index > 0; index--) {

    const jindex = Math.floor(Math.random() * (index + 1));

    [array[index], array[jindex]] = [array[jindex], array[index]];
  }

};

export const getArrayOfRandomLength = (array) => {

  const localArrayCopy = array.slice();

  const itemsNumber = getRandomInteger(1, localArrayCopy.length);

  shuffle(localArrayCopy);

  return localArrayCopy.splice(0, itemsNumber);

};


export const getRandomArrayItem = (array) => {

  const localArrayCopy = array.slice();

  const typeIndex = getRandomInteger(0, localArrayCopy.length - 1);

  return localArrayCopy[typeIndex];

};
export const getHouseTypeStringValue = (type) => {
  switch (type) {
    case HouseTypes.Bungalow:
      return 'Бунгало';
    case HouseTypes.Flat:
      return 'Квартира';
    case HouseTypes.Hotel:
      return 'Отель';
    case HouseTypes.House:
      return 'Дом';
    case HouseTypes.Palace:
      return 'Дворец';
  }
};
/**
    «Бунгало» — минимальная цена за ночь 0;
    «Квартира» — минимальная цена за ночь 1 000;
    «Отель» — минимальная цена за ночь 3 000;
    «Дом» — минимальная цена 5 000;
    «Дворец» — минимальная цена 10 000.} typeValue

 */
const getPriceByType  = (typeValue) => {
  switch (typeValue) {
    case 'bungalow' : {
      return 0;
    }
    case 'flat' : {
      return 1000;
    }
    case 'hotel' : {
      return 3000;
    }
    case 'house' : {
      return 5000;
    }
    case 'palace' : {
      return 10000;
    }
  }
};
/**
 *  1 комната — «для 1 гостя»;
    2 комнаты — «для 2 гостей» или «для 1 гостя»;
    3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
    100 комнат — «не для гостей».
 */
const getCapacitiesForRoomNumber = (roomNumber)=>{
  switch(roomNumber){
    case '1' : return ['1'];
    case '2' : return ['2','1'];
    case '3' : return ['3','2','1'];
    case '100': return ['0'];
  }
};

export const updatePrice = (select,priceInput)=>{
  const selectedTypeValue = select.value;
  const price  = getPriceByType(selectedTypeValue);
  priceInput.min = price;
  priceInput.placeholder = price;
};
export const updateTimeOut = (timeOutSelect,timeInSelect)=>{
  timeOutSelect.value = timeInSelect.value;
};
export const updateTimeIn = (timeInSelect,timeOutSelect)=>{
  timeInSelect.value = timeOutSelect.value;
};
export const updateCapacity = (roomNumber,capacitySelect)=>{
  capacitySelect.innerHTML = '';
  const capacitiesArray = getCapacitiesForRoomNumber(roomNumber);
  const optionsTemplate = document.querySelector('#capacityOptions').content;
  const optionslist = optionsTemplate.querySelectorAll('option');
  const fragment = document.createDocumentFragment();
  optionslist.forEach((optionTemplate)=>{
    const option = optionTemplate.cloneNode(true);
    if(capacitiesArray.some((capacity)=>capacity===option.value)){
      fragment.appendChild(option);
    }
  });
  capacitySelect.appendChild(fragment);
};


