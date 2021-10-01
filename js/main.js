const checkRange = (from, to) => {

  const range = to - from;

  if (range < 0) {

    throw new Error('Начальное значение диапазона не может быть больше конечного');

  }
  if (range === 0) {

    throw new Error('Начальное значение диапазона не может быть равно конечному');
  }
};

const getRandomInteger = (from, to) => {

  try {

    checkRange(from, to);

    return Math.floor(Math.random() * (to - from + 1)) + from;

  } catch (error) {

    return error.message;
  }

};

getRandomInteger(-9, -8);


const getRandomFloat = (from, to, decimalPlacesNumber) => {
  try {

    checkRange(from, to);

    const randomFloat = Math.random() * (to - from + 1) + from;

    return parseFloat(randomFloat.toFixed(decimalPlacesNumber));

  } catch (error) {

    return error.message;
  }

};

getRandomFloat(2, 8, 2);
