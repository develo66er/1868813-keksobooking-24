import {updatePrice, updateTimeOut,updateTimeIn, updateCapacity} from './util.js';
const handleMinLen = (input, gap) => {
  input.setCustomValidity(`Не хватает ${gap} симв.`);
};
const handleMaxLen = (input, max) => {
  input.setCustomValidity(`Вы можете ввести не более ${max} симв.`);
};
const handleMin = (input, min) => {
  input.setCustomValidity(`Значение не может быть меньше ${min}.`);
};
const handleMax = (input, max) => {
  input.setCustomValidity(`Значение не может быть больше ${max}.`);
};
const handleNoErrors = (input)=>{
  input.setCustomValidity('');
};

export const textAreaHandler = (event) => {
  const textAreaInput=event.target;
  if(textAreaInput.type!=='textarea'){
    return;
  }
  const minLength = textAreaInput.minLength;
  const maxLength = textAreaInput.maxLength;
  const valueLength = textAreaInput.value.length;
  if (valueLength<minLength) {
    handleMinLen(textAreaInput,minLength-valueLength);
  }else if(valueLength>=maxLength){
    handleMaxLen(textAreaInput, maxLength);
  }else{
    handleNoErrors(textAreaInput);
  }
  textAreaInput.reportValidity();
};

export const numberInputHandler = (event) => {
  const numberInput=event.target;
  if(numberInput.type!=='number'){
    return;
  }
  const min = numberInput.min;
  const max = numberInput.max;
  const value = +numberInput.value;
  if (value<min) {
    handleMin(numberInput,min);
  }else if(value>max){
    handleMax(numberInput, max);
  }else{
    handleNoErrors(numberInput);
  }
  numberInput.reportValidity();
};

export const selectTypeListHandler = (event)=>{
  const select  = event.target;
  const priceInput = select.form.querySelector('#price');
  updatePrice(select,priceInput);
};
export const selectTimeInListHandler = (event)=>{
  const timein  = event.target;
  const timeout = timein.form.querySelector('#timeout');
  updateTimeOut(timeout,timein);
};
export const selectTimeOutListHandler = (event)=>{
  const timeout  = event.target;
  const timein = timeout.form.querySelector('#timein');
  updateTimeIn(timein,timeout);
};
export const selectRoomNumberHandler = (event)=>{
  const roomNumberSelect  = event.target;
  const capacity = roomNumberSelect.form.querySelector('#capacity');
  updateCapacity(roomNumberSelect.value,capacity);
};
