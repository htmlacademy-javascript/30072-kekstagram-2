import { getRandomElement, debounce } from './utils.js';
import { createGallery } from './gallery.js';

const RANDOM_FILTER_AMOUNT = 10;
const RENDERED_DELAY = 500;
const filtersWrapper = document.querySelector('.img-filters');
const FilterButtonClass = {
  STATIC: 'img-filters__button',
  ACTIVE: 'img-filters__button--active',
};
const FilterButtonId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed',
};
const filterButtons = document.querySelectorAll(`.${FilterButtonClass.STATIC}`);

export const showFilters = () => {
  filtersWrapper.classList.remove('img-filters--inactive');
};

const filterDefaultPhotos = (data) => {
  const originalData = data;
  createGallery(originalData);
};

const filterRandomPhotos = (data) => {
  const originalData = data;
  const randomData = [];

  originalData.forEach(() => {
    const randomElement = getRandomElement(0, originalData);
    if (!randomData.includes(randomElement) && randomData.length < RANDOM_FILTER_AMOUNT) {
      randomData.push(randomElement);
    }
  });

  createGallery(randomData);
};

const filterPopularPhotos = (data) => {
  const originalData = data;
  const popularData = [...originalData].sort((a, b) => b.comments.length - a.comments.length);

  createGallery(popularData);
};

const toggleActiveClass = (element) => {
  if (!element.classList.contains(FilterButtonClass.ACTIVE)) {
    filterButtons.forEach((item) => {
      item.classList.remove(FilterButtonClass.ACTIVE);
    });
    element.classList.add(FilterButtonClass.ACTIVE);
  }
};

const debounceRender = debounce((filterType, data) => {
  filterType(data);
}, RENDERED_DELAY);

function onFiltersClick (evt, data) {
  const currentElement = evt.target;
  if (currentElement.classList.contains(FilterButtonClass.STATIC)) {
    evt.preventDefault();
    toggleActiveClass(currentElement);

    if (currentElement.id === FilterButtonId.DEFAULT) {
      debounceRender(filterDefaultPhotos, data);
    }

    if (currentElement.id === FilterButtonId.RANDOM) {
      debounceRender(filterRandomPhotos, data);
    }

    if (currentElement.id === FilterButtonId.POPULAR) {
      debounceRender(filterPopularPhotos, data);
    }
  }
}

export const manageFilters = (data) => {
  filtersWrapper.addEventListener('click', (evt) => onFiltersClick(evt, data));
};
