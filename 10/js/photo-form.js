import { chooseEffect, chooseOption } from './slider-helpers';

const COMMENT_MAX_LENGTH = 140;

const HASHTAGS_MAX_AMOUNT = 5;
const HASHTAG_MAX_LENGTH = 20;

const IMAGE_MIN_SCALE = 25;
const IMAGE_MAX_SCALE = 100;
const IMAGE_SCALE_STEP = 25;

const bodyElement = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const modalOverlay = document.querySelector('.img-upload__overlay');
const closeModalButton = document.querySelector('.img-upload__cancel');

const imageForm = document.querySelector('.img-upload__form');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const sliderElement = document.querySelector('.effect-level__slider');
const effectWrapper = document.querySelector('.img-upload__effect-level');
const effectInput = document.querySelector('.effect-level__value');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 20,
});

const openModal = () => {
  bodyElement.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');

  closeModalButton.addEventListener('click', handleCloseButtonClick);
  document.addEventListener('keydown', handleCloseModalKeydown);

  scaleDownButton.addEventListener('click', handleScaleDownButtonClick);
  scaleUpButton.addEventListener('click', handleScaleUpButtonClick);

  document.addEventListener('click', handleRadioClick);
  effectWrapper.classList.add('hidden');
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  modalOverlay.classList.add('hidden');
  imageForm.reset();
  pristine.reset();
  document.removeEventListener('keydown', handleCloseModalKeydown);
  document.removeEventListener('click', handleRadioClick);
};

function handleUploadInputClick (evt) {
  evt.preventDefault();
  openModal();
}

function handleCloseButtonClick (evt) {
  evt.preventDefault();
  closeModal();
}

function handleCloseModalKeydown (evt) {
  if (evt.key === 'Escape') {
    if (!(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
      closeModal();
    }
  }
}

const checkHashtagValidity = () => {
  if (!hashtagsInput.value) {
    return true;
  }

  const purifiedInputValue = hashtagsInput.value.trim().toLowerCase();
  const hashtagsArray = purifiedInputValue.split(/\s+/).filter(Boolean);
  const uniqueHashtagsArray = new Set(hashtagsArray);

  if (uniqueHashtagsArray.size !== hashtagsArray.length) {
    return false;
  }
  if (hashtagsArray.length > HASHTAGS_MAX_AMOUNT) {
    return false;
  }

  return hashtagsArray.every((hashtag) => {
    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      return false;
    }
    if (hashtag === '#') {
      return false;
    }
    if (!(/^#[a-zа-яё0-9]+$/i.test(hashtag))) {
      return false;
    }

    return true;
  });
};

const checkCommentValidity = () => commentTextarea.value.length <= COMMENT_MAX_LENGTH;


const updateImageScale = (direction) => {
  const purifiedCurrentValue = parseInt(scaleInput.value, 10);
  if (direction === 'up' && purifiedCurrentValue < IMAGE_MAX_SCALE) {
    scaleInput.value = `${purifiedCurrentValue + IMAGE_SCALE_STEP}%`;
    previewImage.style.scale = (purifiedCurrentValue + IMAGE_SCALE_STEP) / 100;
  }
  if (direction === 'down' && purifiedCurrentValue > IMAGE_MIN_SCALE) {
    scaleInput.value = `${purifiedCurrentValue - IMAGE_SCALE_STEP}%`;
    previewImage.style.scale = (purifiedCurrentValue - IMAGE_SCALE_STEP) / 100;
  }
};

function handleScaleDownButtonClick (evt) {
  evt.preventDefault();
  updateImageScale('down');
}

function handleScaleUpButtonClick (evt) {
  evt.preventDefault();
  updateImageScale('up');
}

function handleRadioClick (evt) {
  const currentElement = evt.target;
  if (currentElement.classList.contains('effects__radio')) {
    const currentValue = currentElement.value;
    const currentEffect = chooseEffect(currentValue, effectInput.value);
    const currentOption = chooseOption(currentValue);

    if (!currentEffect) {
      effectWrapper.classList.add('hidden');
    } else {
      effectWrapper.classList.remove('hidden');
    }

    previewImage.style.filter = currentEffect;
    sliderElement.noUiSlider.updateOptions(currentOption, true);
  }
}

sliderElement.noUiSlider.on('update', () => {
  effectInput.value = sliderElement.noUiSlider.get();
  previewImage.style.filter = chooseEffect(imageForm.elements.effect.value, effectInput.value);
});

export const submitImageForm = () => {
  pristine.addValidator(hashtagsInput, checkHashtagValidity);
  pristine.addValidator(commentTextarea, checkCommentValidity);

  uploadInput.addEventListener('change', handleUploadInputClick);

  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate(hashtagsInput, commentTextarea)) {
      imageForm.submit();
    }
  });
};
