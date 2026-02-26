import { getEffectFilter, getEffectOptions } from './slider-helpers.js';

const imageForm = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');
const effectWrapper = document.querySelector('.img-upload__effect-level');

const effectInput = document.querySelector('.effect-level__value');
const rangeSlider = document.querySelector('.effect-level__slider');

noUiSlider.create(rangeSlider, getEffectOptions());

rangeSlider.noUiSlider.on('update', () => {
  effectInput.value = Number(rangeSlider.noUiSlider.get());
  previewImage.style.filter = getEffectFilter(imageForm.elements.effect.value, effectInput.value);
});

export const onEffectsClick = (evt) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains('effects__radio')) {
    const currentValue = currentElement.value;
    const currentEffect = getEffectFilter(currentValue, effectInput.value);
    const currentOption = getEffectOptions(currentValue);

    if (!currentEffect) {
      effectWrapper.classList.add('hidden');
    } else {
      effectWrapper.classList.remove('hidden');
    }

    previewImage.style.filter = currentEffect;
    rangeSlider.noUiSlider.updateOptions(currentOption, true);
  }
};
