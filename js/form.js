export const setFormInactive = (formClassName) => {
  const form = document.querySelector(`.${formClassName}`);
  /**
     * Форма заполнения информации об объявлении .${formClassName} содержит класс ${formClassName}--disabled;
     */
  form.classList.add(`${formClassName}--disabled`);
  /**
     * Все интерактивные элементы формы .${formClassName} должны быть заблокированы
     * с помощью атрибута disabled,
     *  добавленного на них или на их родительские блоки fieldset;
     */
  const fieldsetList = form.querySelectorAll('fieldset');
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};
export const setFormActive = (formClassName) => {
  const form = document.querySelector(`.${formClassName}`);
  /**
       * Форма заполнения информации об объявлении .${formClassName} содержит класс ${formClassName}--disabled;
       */
  form.classList.remove(`${formClassName}--disabled`);
  /**
       * Все интерактивные элементы формы .${formClassName} должны быть разблокированы
       * с помощью атрибута disabled=false,
       *  добавленного на них или на их родительские блоки fieldset;
       */
  const fieldsetList = form.querySelectorAll('fieldset');
  fieldsetList.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};
