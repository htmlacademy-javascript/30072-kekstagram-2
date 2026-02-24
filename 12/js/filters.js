import { getRandomElement, debounce } from './utils.js';
import { createGallery } from './gallery.js';

const RANDOM_FILTER_AMOUNT = 10;
const RENDERED_DELAY = 500;
const filtersWrapper = document.querySelector('.img-filters');
const FilterButton = {
  CLASS_STATIC: 'img-filters__button',
  CLASS_ACTIVE: 'img-filters__button--active',
  ID_DEFAULT: 'filter-default',
  ID_RANDOM: 'filter-random',
  ID_POPULAR: 'filter-discussed',
};
const filterButtons = document.querySelectorAll(`.${FilterButton.CLASS_STATIC}`);

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
  if (!element.classList.contains(FilterButton.CLASS_ACTIVE)) {
    filterButtons.forEach((item) => {
      item.classList.remove(FilterButton.CLASS_ACTIVE);
    });
    element.classList.add(FilterButton.CLASS_ACTIVE);
  }
};

function onDocumentClick (evt, data) {
  const currentElement = evt.target;
  if (currentElement.classList.contains(FilterButton.CLASS_STATIC)) {
    evt.preventDefault();

    if (currentElement.id === FilterButton.ID_DEFAULT) {
      filterDefaultPhotos(data);
    }

    if (currentElement.id === FilterButton.ID_RANDOM) {
      filterRandomPhotos(data);
    }

    if (currentElement.id === FilterButton.ID_POPULAR) {
      filterPopularPhotos(data);
    }

    toggleActiveClass(currentElement);
  }
}

export const manageFilters = (data) => {
  debounce(document.addEventListener('click', (evt) => onDocumentClick(evt, data)), RENDERED_DELAY);
};
