const DELAY = 500;
export const body = document.querySelector('body');
export const imageForm = document.querySelector('.img-upload__form');
export const imagePreview = document.querySelector('.img-upload__preview img');

const getRandomInteger = (i, j) => {
  const lower = Math.ceil(Math.min(i, j));
  const upper = Math.floor(Math.max(i, j));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomElement = (minItem, items) => items[getRandomInteger(minItem, items.length - 1)];

export const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
