import { HouseTypes } from './house-types.js';

const getHouseTypeStringValue = (type) => {
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

const transformPrice = (value, price) => {
  switch (price) {
    case 'low': return value < 10000;
    case 'middle': return value >= 10000 && value < 50000;
    case 'high': return value >= 50000;
  }
};

const setupOfferType = (offer) => {
  if (offer.type) {
    offer.type = getHouseTypeStringValue(offer.type);
  }

};
export { getHouseTypeStringValue, setupOfferType, transformPrice };
