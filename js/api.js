const getData = (onError) => fetch('https://24.javascript.pages.academy/keksobooking/data').catch(() => onError());

const postData = (body) => fetch('https://24.javascript.pages.academy/keksobooking'
  , { method: 'POST', body });

export { getData, postData };
