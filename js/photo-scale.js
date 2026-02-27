import { imagePreview } from './utils.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleInput = document.querySelector('.scale__control--value');

export const updateImageScale = (direction) => {
  const purifiedCurrentValue = parseInt(scaleInput.value, 10);
  if (direction === 'up' && purifiedCurrentValue < Scale.MAX) {
    scaleInput.value = `${Number(purifiedCurrentValue + Scale.STEP)}%`;
    imagePreview.style.transform = `scale(${(Number(purifiedCurrentValue + Scale.STEP) / 100)})`;
  }
  if (direction === 'down' && purifiedCurrentValue > Scale.MIN) {
    scaleInput.value = `${Number(purifiedCurrentValue - Scale.STEP)}%`;
    imagePreview.style.transform = `scale(${(Number(purifiedCurrentValue - Scale.STEP) / 100)})`;
  }
};

export const onScaleDownButtonClick = (evt) => {
  evt.preventDefault();
  updateImageScale('down');
};

export const onScaleUpButtonClick = (evt) => {
  evt.preventDefault();
  updateImageScale('up');
};
