const checkStringLength = function(stringValue, maxLength){
  return stringValue.length<=maxLength;
};

checkStringLength('Example',5);

const getRandomIntegers = function(from, to){
  if(from>to) {
    return new Error('Начальное значение диапазона не может быть больше конечного');
  }
  if(from===to){
    return new Error('Начальное значение диапазона не может быть равно конечному');
  }
  return Math.floor(Math.random()*(to-from+1))+from;
};

getRandomIntegers(3,8);


const getRandomFloats = function(from, to, decimalPlacesNumber){
  if(from>to) {
    return new Error('Начальное значение диапазона не может быть больше конечного');
  }
  if(from===to){
    return new Error('Начальное значение диапазона не может быть равно конечному');
  }
  const randomFloat = Math.random()*(to-from+1)+from;
  return randomFloat.toFixed(decimalPlacesNumber);
};

getRandomFloats(2,8,2);
