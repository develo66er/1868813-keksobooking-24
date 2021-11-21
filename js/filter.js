import { filterFormChangeHandler } from './handlers.js';

const filters = new Map([]);

const setupFilters = () => {
  const filtersForm = document.querySelector('.map__filters');
  filtersForm.addEventListener('change', filterFormChangeHandler);
};
const clearFilters = () => filters.clear();
const setFilter = (key, value) => {
  filters.set(key, value);
};

const getFilter = (key) => filters.get(key);

const getFiltersView = () => new Map(filters);

export { setupFilters, getFiltersView, setFilter, getFilter, clearFilters };


