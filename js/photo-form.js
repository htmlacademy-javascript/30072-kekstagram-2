import { body } from './utils.js';
import { getEffectFilter, getEffectOptions } from './slider-helpers.js';
import { checkHashtagsValidity, checkCommentValidity, COMMENT_ERROR_MESSAGE, getHashtagsErrorMessage } from './form-validation.js';
import { sendData } from './api.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const REMOVE_SERVER_MESSAGE_TIMEOUT = 5000;

const uploadInput = document.querySelector('.img-upload__input');
const modalOverlay = document.querySelector('.img-upload__overlay');
const closeModalButton = document.querySelector('.img-upload__cancel');

const imageForm = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const sliderElement = document.querySelector('.effect-level__slider');
const effectWrapper = document.querySelector('.img-upload__effect-level');
const effectInput = document.querySelector('.effect-level__value');

const serverDataErrorTemplate = document.querySelector('#data-error');
const serverDataErrorClone = serverDataErrorTemplate.content.cloneNode(true);
const serverDataErrorElement = serverDataErrorClone.querySelector('.data-error');

const formDataErrorTemplate = document.querySelector('#error');
const formDataErrorClone = formDataErrorTemplate.content.cloneNode(true);
const formDataErrorElement = formDataErrorClone.querySelector('.error');
const tryAgainButton = formDataErrorElement.querySelector('.error__button');

const formDataSuccessTemplate = document.querySelector('#success');
const formDataSuccessClone = formDataSuccessTemplate.content.cloneNode(true);
const formDataSuccessElement = formDataSuccessClone.querySelector('.success');
const successCloseButton = formDataSuccessElement.querySelector('.success__button');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

noUiSlider.create(sliderElement, getEffectOptions());

const openModal = () => {
  body.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');

  closeModalButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  scaleDownButton.addEventListener('click', onScaleDownButtonClick);
  scaleUpButton.addEventListener('click', onScaleUpButtonClick);

  document.addEventListener('click', onDocumentClick);
  effectWrapper.classList.add('hidden');
};

const closeModal = () => {
  body.classList.remove('modal-open');
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

const toggleSubmitButton = (disabled) => {
  if (disabled) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

const showSuccessMessage = () => {
  closeModal();
  body.append(formDataSuccessElement);
  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  body.addEventListener('keydown', onBodyKeydown);
};

const showErrorMessage = () => {
  body.append(formDataErrorElement);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  body.addEventListener('keydown', onBodyKeydown);
};

export const showDataErrorMessage = () => {
  body.append(serverDataErrorElement);
  setTimeout(() => {
    serverDataErrorElement.remove();
  }, REMOVE_SERVER_MESSAGE_TIMEOUT);
};

const removeSuccessModal = () => {
  formDataSuccessElement.remove();
  body.removeEventListener('keydown', onBodyKeydown);
};

const removeErrorModal = () => {
  formDataErrorElement.remove();
  body.removeEventListener('keydown', onBodyKeydown);
};

function onSuccessCloseButtonClick (evt) {
  evt.preventDefault();
  removeSuccessModal();
}

function onTryAgainButtonClick (evt) {
  evt.preventDefault();
  removeErrorModal();
}

function onBodyKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    if (formDataSuccessElement.isConnected) {
      removeSuccessModal();
    }
    if (formDataErrorElement.isConnected) {
      removeErrorModal();
    }
  }
}

export const submitImageForm = () => {
  pristine.addValidator(hashtagsInput, () => checkHashtagsValidity(hashtagsInput), () => getHashtagsErrorMessage(hashtagsInput));
  pristine.addValidator(commentTextarea, () => checkCommentValidity(commentTextarea), COMMENT_ERROR_MESSAGE);

  uploadInput.addEventListener('change', onUploadInputChange);

  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate(hashtagsInput, commentTextarea)) {
      const fetchBody = new FormData(evt.target);

      toggleSubmitButton(true);

      sendData(fetchBody, () => showSuccessMessage(), () => showErrorMessage(), () => toggleSubmitButton(false));
    }
  });
};
