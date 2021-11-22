import { getHouseTypeStringValue } from './util.js';
import {
  addDataSendSuccessHandler,
  addDataSendErrorHandler, addDataGetErrorHandler
} from './handlers.js';

const getCapacitiesForRoomNumber = (roomNumber) => {
  switch (roomNumber) {
    case '1': {
      return ['1'];
    }
    case '2': {
      return ['2', '1'];
    }
    case '3': {
      return ['3', '2', '1'];
    }
    case '100': {
      return ['0'];
    }
  }
};

const getPriceByType = (typeValue) => {
  switch (typeValue) {
    case 'bungalow': {
      return 0;
    }
    case 'flat': {
      return 1000;
    }
    case 'hotel': {
      return 3000;
    }
    case 'house': {
      return 5000;
    }
    case 'palace': {
      return 10000;
    }
  }
};

const renderPopup = (data) => {
  const card = document.querySelector('#card').content;
  const cardTemplate = card.querySelector('.popup').cloneNode(true);
  const offer = data.offer;
  const popupTitle = cardTemplate.querySelector('.popup__title');
  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.classList.add('hidden');
  }
  const popupAddress = cardTemplate.querySelector('.popup__text--address');
  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    popupAddress.classList.add('hidden');
  }
  const popupPrice = cardTemplate.querySelector('.popup__text--price');
  if (offer.price) {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupPrice.classList.add('hidden');
  }
  const popupType = cardTemplate.querySelector('.popup__type');
  if (offer.type) {
    popupType.textContent = getHouseTypeStringValue(offer.type);
  } else {
    popupType.classList.add('hidden');
  }
  const popupCapacity = cardTemplate.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else if (offer.rooms) {
    popupCapacity.textContent = `${offer.rooms} комнаты`;
  } else if (offer.guests) {
    popupCapacity.textContent = `Для ${offer.guests} гостей`;
  } else {
    popupCapacity.classList.add('hidden');
  }
  const popupTime = cardTemplate.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else if (offer.checkin) {
    popupTime.textContent = `Заезд после ${offer.checkin}`;
  } else if (offer.checkout) {
    popupTime.textContent = `Выезд до ${offer.checkout}`;
  } else {
    popupTime.classList.add('hidden');
  }
  const popupFeaturesContainer = cardTemplate.querySelector('.popup__features');
  const popupFeatures = popupFeaturesContainer.querySelectorAll('.popup__feature');
  if (offer.features && offer.features.lenght !== 0) {
    const features = offer.features;
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    popupFeatures.forEach((feature) => {
      const modifier = feature.classList[1];
      if (!modifiers.includes(modifier)) {
        feature.remove();
      }
    });
  } else {
    popupFeaturesContainer.classList.add('hidden');
  }
  const popupDescription = cardTemplate.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.classList.add('hidden');
  }
  const popupPhotosContainer = cardTemplate.querySelector('.popup__photos');
  if (offer.photos && offer.photos.lenght !== 0) {
    popupPhotosContainer.innerHTML = '';
    offer.photos.forEach((photoUrl) => {
      const photo = document.createElement('img');
      photo.src = photoUrl;
      photo.classList.add('popup__photo');
      photo.style.width = '45px';
      photo.style.height = '40px';
      photo.alt = 'Фотография жилья';
      popupPhotosContainer.appendChild(photo);
    });
  } else {
    popupPhotosContainer.classList.add('hidden');
  }

  const popupAvatar = cardTemplate.querySelector('.popup__avatar');
  if (data.author && data.author.avatar) {
    popupAvatar.innerHTML = '';
    popupAvatar.src = data.author.avatar;
    popupAvatar.classList.add('popup__avatar');
    popupAvatar.style.width = '70px';
    popupAvatar.style.height = '70px';
  }
  return cardTemplate;
};

const setAddress = (lat, lng) => {
  lat = lat.toFixed(5);
  lng = lng.toFixed(5);
  document.querySelector('#address').value = `${lat},${lng}`;
};

const updatePrice = (type, priceInput) => {
  const price = getPriceByType(type);
  priceInput.min = price;
  priceInput.placeholder = price;
};

const updateTimeOut = (timeOutSelect, timeInSelect) => {
  timeOutSelect.value = timeInSelect.value;
};

const updateTimeIn = (timeInSelect, timeOutSelect) => {
  timeInSelect.value = timeOutSelect.value;
};

const updateCapacity = (roomNumber, capacitySelect) => {
  capacitySelect.innerHTML = '';
  const capacitiesArray = getCapacitiesForRoomNumber(roomNumber);
  const optionsTemplate = document.querySelector('#capacityOptions').content;
  const optionslist = optionsTemplate.querySelectorAll('option');
  const fragment = document.createDocumentFragment();
  optionslist.forEach((optionTemplate) => {
    const option = optionTemplate.cloneNode(true);
    if (capacitiesArray.some((capacity) => capacity === option.value)) {
      fragment.appendChild(option);
    }
  });
  capacitySelect.appendChild(fragment);
};

const outputFormSendSuccessMessage = () => {
  const body = document.querySelector('body');
  const successMessageTemplate = document.querySelector('#success').content;
  const success = successMessageTemplate.querySelector('.success').cloneNode(true);
  body.insertAdjacentElement('beforeend', success);
  document.addEventListener('click', addDataSendSuccessHandler);
  document.addEventListener('keydown', addDataSendSuccessHandler);

};

const outputFormSendErrorMessage = (message) => {
  const body = document.querySelector('body');
  const errorMessageTemplate = document.querySelector('#error').content;
  const error = errorMessageTemplate.querySelector('.error').cloneNode(true);
  error.querySelector('.error__message').innerHTML = message;
  body.insertAdjacentElement('beforeend', error);
  const errorButton = error.querySelector('.error__button');
  errorButton.addEventListener('click', addDataSendErrorHandler);
  document.addEventListener('click', addDataSendErrorHandler);
  document.addEventListener('keydown', addDataSendErrorHandler);
};

const outputGetAddDataErrorMessage = (message) => {
  const errorMessage = document.querySelector('.get-data_error');
  errorMessage.querySelector('.error__message').textContent = message;
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.classList.add('hidden');
  errorMessage.classList.remove('hidden');
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', addDataGetErrorHandler);
};

const clearAddImages = () => {
  const images = document.querySelectorAll('.ad-form__photo-container .ad-form__photo');
  images.forEach((image) => {
    image.remove();
  });
};

const clearAvatarImage = () => {
  const avatarPreview = document.querySelector('.ad-form-header__preview>img');
  avatarPreview.src = 'img/muffin-grey.svg';
};

export {
  renderPopup, setAddress,
  updatePrice, updateTimeOut,
  updateTimeIn, updateCapacity,
  outputFormSendSuccessMessage,
  outputFormSendErrorMessage,
  outputGetAddDataErrorMessage,
  clearAddImages, clearAvatarImage
};
