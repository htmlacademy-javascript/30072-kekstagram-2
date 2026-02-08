import { getEffectFilter, getEffectOptions } from './slider-helpers.js';

const COMMENT_MAX_LENGTH = 140;

const Hashtag = {
  MAX_AMOUNT: 5,
  MAX_LENGTH: 20,
};

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};


const bodyElement = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const modalOverlay = document.querySelector('.img-upload__overlay');
const closeModalButton = document.querySelector('.img-upload__cancel');

const imageForm = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const sliderElement = document.querySelector('.effect-level__slider');
const effectWrapper = document.querySelector('.img-upload__effect-level');
const effectInput = document.querySelector('.effect-level__value');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

noUiSlider.create(sliderElement, getEffectOptions());

const openModal = () => {
  bodyElement.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');

  closeModalButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  scaleDownButton.addEventListener('click', onScaleDownButtonClick);
  scaleUpButton.addEventListener('click', onScaleUpButtonClick);

  document.addEventListener('click', onDocumentClick);
  effectWrapper.classList.add('hidden');
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  modalOverlay.classList.add('hidden');
  imageForm.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

function onUploadInputChange (evt) {
  evt.preventDefault();
  openModal();
}

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeModal();
}

function onDocumentKeydown (evt) {
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
  if (hashtagsArray.length > Hashtag.MAX_AMOUNT) {
    return false;
  }

  return hashtagsArray.every((hashtag) => {
    if (hashtag.length > Hashtag.MAX_LENGTH) {
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
  if (direction === 'up' && purifiedCurrentValue < Scale.MAX) {
    scaleInput.value = `${purifiedCurrentValue + Scale.STEP}%`;
    previewImage.style.scale = (purifiedCurrentValue + Scale.STEP) / 100;
  }
  if (direction === 'down' && purifiedCurrentValue > Scale.MIN) {
    scaleInput.value = `${purifiedCurrentValue - Scale.STEP}%`;
    previewImage.style.scale = (purifiedCurrentValue - Scale.STEP) / 100;
  }
};

function onScaleDownButtonClick (evt) {
  evt.preventDefault();
  updateImageScale('down');
}

function onScaleUpButtonClick (evt) {
  evt.preventDefault();
  updateImageScale('up');
}

function onDocumentClick (evt) {
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
    sliderElement.noUiSlider.updateOptions(currentOption, true);
  }
}

sliderElement.noUiSlider.on('update', () => {
  effectInput.value = sliderElement.noUiSlider.get();
  previewImage.style.filter = getEffectFilter(imageForm.elements.effect.value, effectInput.value);
});

export const submitImageForm = () => {
  pristine.addValidator(hashtagsInput, checkHashtagValidity);
  pristine.addValidator(commentTextarea, checkCommentValidity);

  uploadInput.addEventListener('change', onUploadInputChange);

  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate(hashtagsInput, commentTextarea)) {
      imageForm.submit();
    }
  });
};
