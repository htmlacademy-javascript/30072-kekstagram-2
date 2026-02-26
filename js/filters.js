import { getRandomElement, debounce } from './utils.js';
import { createGallery } from './gallery.js';

const RANDOM_FILTER_AMOUNT = 10;
const RENDERED_DELAY = 500;
const FilterButtonClass = {
  STATIC: 'img-filters__button',
  ACTIVE: 'img-filters__button--active',
};
const FilterButtonId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed',
};
const filtersWrapper = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll(`.${FilterButtonClass.STATIC}`);

const renderGallery = debounce(createGallery, RENDERED_DELAY);

const filterRandomPhotos = (data) => {
  const randomData = [];

  data.forEach(() => {
    const randomElement = getRandomElement(0, data);
    if (!randomData.includes(randomElement) && randomData.length < RANDOM_FILTER_AMOUNT) {
      randomData.push(randomElement);
    }
  });

  renderGallery(randomData);
};

const filterPopularPhotos = (data) => {
  const popularData = [...data].sort((a, b) => b.comments.length - a.comments.length);

  renderGallery(popularData);
};

const toggleActiveClass = (element) => {
  if (!element.classList.contains(FilterButtonClass.ACTIVE)) {
    filterButtons.forEach((item) => {
      item.classList.remove(FilterButtonClass.ACTIVE);
    });
    element.classList.add(FilterButtonClass.ACTIVE);
  }
};

const onFiltersClick = (evt, data) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains(FilterButtonClass.STATIC)) {
    evt.preventDefault();
    toggleActiveClass(currentElement);

    if (currentElement.id === FilterButtonId.DEFAULT) {
      renderGallery(data);
    }

    if (currentElement.id === FilterButtonId.RANDOM) {
      filterRandomPhotos(data);
    }

    if (currentElement.id === FilterButtonId.POPULAR) {
      filterPopularPhotos(data);
    }
  }
};

export const initFilters = (data) => {
  filtersWrapper.classList.remove('img-filters--inactive');
  filtersWrapper.addEventListener('click', (evt) => onFiltersClick(evt, data));
};
