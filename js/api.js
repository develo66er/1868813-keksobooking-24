const getData = (onSuccess,onError) => fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((result)=>{
    if(result.ok){
      onSuccess(result.json());
    }else{
      throw new Error('Данные не были получены');
    }
  }).catch(() => onError('Данные не были получены'));

const postData = (onSuccess, onError,body) => fetch('https://124.javascript.pages.academy/keksobooking/'
  , { method: 'POST', body }).then((response) => {
  if (response.ok) {
    onSuccess();
  } else if (response.status >= 500 && response.status <= 505) {
    throw new Error('Отсутствует соединение с сервером.');
  } else {
    throw new Error('Не удалось отправить форму.');
  }
}).catch(() => {
  onError('Не удалось отправить форму.');
});
export { getData, postData};
