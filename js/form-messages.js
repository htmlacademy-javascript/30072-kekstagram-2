import { body } from './utils.js';

const REMOVE_SERVER_MESSAGE_TIMEOUT = 5000;

const serverDataErrorTemplate = document.querySelector('#data-error');
const serverDataErrorClone = serverDataErrorTemplate.content.cloneNode(true);
const serverDataErrorToast = serverDataErrorClone.querySelector('.data-error');

const formDataErrorTemplate = document.querySelector('#error');
const formDataErrorClone = formDataErrorTemplate.content.cloneNode(true);
const formDataErrorToast = formDataErrorClone.querySelector('.error');
const tryAgainButton = formDataErrorToast.querySelector('.error__button');

const formDataSuccessTemplate = document.querySelector('#success');
const formDataSuccessClone = formDataSuccessTemplate.content.cloneNode(true);
const formDataSuccessToast = formDataSuccessClone.querySelector('.success');
const successCloseButton = formDataSuccessToast.querySelector('.success__button');

const removeSuccessModal = () => {
  formDataSuccessToast.remove();
  body.removeEventListener('keydown', onBodyKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const removeErrorModal = () => {
  formDataErrorToast.remove();
  body.removeEventListener('keydown', onBodyKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const onSuccessCloseButtonClick = (evt) => {
  evt.preventDefault();
  removeSuccessModal();
};

const onTryAgainButtonClick = (evt) => {
  evt.preventDefault();
  removeErrorModal();
};

const closeModal = () => {
  if (formDataSuccessToast.isConnected) {
    removeSuccessModal();
  }
  if (formDataErrorToast.isConnected) {
    removeErrorModal();
  }
};

function onBodyKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    closeModal();
  }
}

function onDocumentClick (evt) {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeModal();
  }
}

export const showSuccessMessage = () => {
  body.append(formDataSuccessToast);
  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  body.addEventListener('keydown', onBodyKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showErrorMessage = () => {
  body.append(formDataErrorToast);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  body.addEventListener('keydown', onBodyKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showDataErrorMessage = () => {
  body.append(serverDataErrorToast);
  setTimeout(() => {
    serverDataErrorToast.remove();
  }, REMOVE_SERVER_MESSAGE_TIMEOUT);
};
