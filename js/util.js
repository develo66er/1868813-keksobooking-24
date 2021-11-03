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
