import { body } from './utils.js';
import { onScaleDownButtonClick, onScaleUpButtonClick } from './photo-scale.js';
import { onEffectsClick } from './photo-effect.js';
import { checkHashtagsValidity, checkCommentValidity, COMMENT_ERROR_MESSAGE, getHashtagsErrorMessage } from './form-validation.js';
import { showSuccessMessage, showErrorMessage } from './form-messages.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

const uploadInput = document.querySelector('.img-upload__input');
const modalOverlay = document.querySelector('.img-upload__overlay');
const closeModalButton = document.querySelector('.img-upload__cancel');

const imageForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');

const effectsWrapper = document.querySelector('.effects__list');
const effectWrapper = document.querySelector('.img-upload__effect-level');
const effectPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const openModal = () => {
  body.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');

  closeModalButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentFormKeydown);

  scaleDownButton.addEventListener('click', onScaleDownButtonClick);
  scaleUpButton.addEventListener('click', onScaleUpButtonClick);

  effectsWrapper.addEventListener('click', onEffectsClick);
  effectWrapper.classList.add('hidden');
};

const closeModal = () => {
  body.classList.remove('modal-open');
  modalOverlay.classList.add('hidden');
  imageForm.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentFormKeydown);
  effectsWrapper.removeEventListener('click', onEffectsClick);
};

const applyUploadedImage = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    imagePreview.src = URL.createObjectURL(file);

    effectPreviews.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeModal();
}

function onDocumentFormKeydown (evt) {
  if (evt.key === 'Escape') {
    if (!(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
      closeModal();
    }
  }
}

const onUploadInputChange = (evt) => {
  evt.preventDefault();
  openModal();
  applyUploadedImage();
};

const toggleSubmitButton = (disabled) => {
  submitButton.disabled = disabled;
};

export const submitImageForm = () => {
  pristine.addValidator(hashtagsInput, () => checkHashtagsValidity(hashtagsInput), () => getHashtagsErrorMessage(hashtagsInput));
  pristine.addValidator(commentTextarea, () => checkCommentValidity(commentTextarea), COMMENT_ERROR_MESSAGE);

  uploadInput.addEventListener('change', onUploadInputChange);

  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const fetchBody = new FormData(evt.target);

      toggleSubmitButton(true);

      sendData(fetchBody, () => {
        showSuccessMessage();
        closeModal();
      },
      () => showErrorMessage(),
      () => toggleSubmitButton(false));
    }
  });
};
