const filters  = new Map([]);
export const setupFiltersAsync = (action)=>new Promise((onSuccess)=>{
  const filtersForm = document.querySelector('.map__filters');
  filtersForm.addEventListener('change',(e)=>{
    // eslint-disable-next-line no-console
    console.log(e.target.type);
    const filterName = e.target.name.replace('housing-','');
    const filterValue = e.target.value;
    if(e.target.type!=='checkbox'){
      filters.set(filterName,filterValue);
    }else{
      if(!filters.get(filterName)){
        filters.set(filterName,[filterValue]);
      }else{
        if(filters.get(filterName).includes(filterValue)){
          const index =filters.get(filterName).indexOf(filterValue);
          filters.get(filterName).splice(index,1);
        }else{
          const features = filters.get(filterName);
          filters.set(filterName,[filterValue,...features]);
        }
      }
    }
    // eslint-disable-next-line no-console
    console.log(filters);
    action();
    onSuccess();
  });
  onSuccess();
});
export const getFiltersView  = ()=> new Map(filters);

