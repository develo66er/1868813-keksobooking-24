import { HouseTypes } from './house-types.js';

const ESC_ALL = 'Escape';
const ESC_IE = 'Esc';

const getHouseTypeStringValue = (type) => {
  switch (type) {
    case HouseTypes.BUNGALOW: {
      return 'Бунгало';
    }
    case HouseTypes.FLAT: {
      return 'Квартира';
    }
    case HouseTypes.HOTEL: {
      return 'Отель';
    }
    case HouseTypes.HOUSE: {
      return 'Дом';
    }
    case HouseTypes.PALACE: {
      return 'Дворец';
    }
  }
};

const transformPrice = (value, price) => {
  switch (price) {
    case 'low': {
      return value < 10000;
    }
    case 'middle': {
      return value >= 10000 && value < 50000;
    }
    case 'high': {
      return value >= 50000;
    }
  }
};

const setupOfferType = (offer) => {
  if (offer.type) {
    offer.type = getHouseTypeStringValue(offer.type);
  }

};
const isEscape = (key) => key === ESC_ALL || key === ESC_IE;

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export { getHouseTypeStringValue, setupOfferType, transformPrice, isEscape, debounce };
