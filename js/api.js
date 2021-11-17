import {getFiltersView} from './filter.js';

const transformPrice = (value,price)=>{
  switch(price){
    case 'low' : return value<10000;
    case 'middle' : return value>=10000&&value<50000;
    case 'high' : return value>=50000;
  }
};
export const getDataAsync = ()=>new Promise((onSuccess,onError)=>{
  // eslint-disable-next-line no-console
  console.log('get data async');
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((result)=>result.json())
    .then((data)=>{
      const filters = getFiltersView();
      if(filters.size>0){
        filters.forEach((filterValue, filterKey)=>{
          if(Array.isArray(filterValue)){
            data = data.filter((offerItem)=>{
              if(!offerItem.offer[filterKey]) {
                return false;
              }
              return filterValue.every((elem)=>offerItem.offer[filterKey].includes(elem));
            });
          }else if(filterValue==='any'){
            return true;
          }
          else{
            data = data.filter((offerItem)=>{
              if(!isNaN(+filterValue)){
                filterValue=+filterValue;
              }else if(filterKey==='price'){
                return transformPrice(offerItem.offer[filterKey],filterValue);
              }
              return offerItem.offer[filterKey]===filterValue;
            });
          }
        });
      }
      data = data.slice(0,10);
      // eslint-disable-next-line no-console
      console.log(data);
      onSuccess(data);
    })
    .catch((error)=>{
      // eslint-disable-next-line no-console
      console.log(error);
      onError();
    });
});

export const postData = (onSuccess,onError,body)=>{
  fetch('https://24.javascript.pages.academy/keksobooking'
    ,{method:'POST',body})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};
