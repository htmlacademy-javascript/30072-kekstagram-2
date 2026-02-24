import { body } from './utils.js';

const REMOVE_SERVER_MESSAGE_TIMEOUT = 5000;

const serverDataErrorTemplate = document.querySelector('#data-error');
const serverDataErrorClone = serverDataErrorTemplate.content.cloneNode(true);
const serverDataErrorElement = serverDataErrorClone.querySelector('.data-error');

const formDataErrorTemplate = document.querySelector('#error');
const formDataErrorClone = formDataErrorTemplate.content.cloneNode(true);
const formDataErrorElement = formDataErrorClone.querySelector('.error');
const formDataErrorElementInner = formDataErrorElement.querySelector('.error__inner');
const tryAgainButton = formDataErrorElement.querySelector('.error__button');

const formDataSuccessTemplate = document.querySelector('#success');
const formDataSuccessClone = formDataSuccessTemplate.content.cloneNode(true);
const formDataSuccessElement = formDataSuccessClone.querySelector('.success');
const formDataSuccessElementInner = formDataSuccessElement.querySelector('.success__inner');
const successCloseButton = formDataSuccessElement.querySelector('.success__button');

const removeSuccessModal = () => {
  formDataSuccessElement.remove();
  body.removeEventListener('keydown', onBodyKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const removeErrorModal = () => {
  formDataErrorElement.remove();
  body.removeEventListener('keydown', onBodyKeydown);
  document.removeEventListener('click', onDocumentClick);
};

export const showSuccessMessage = (closeModal) => {
  closeModal();
  body.append(formDataSuccessElement);
  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  body.addEventListener('keydown', onBodyKeydown);
  document.addEventListener('click', onDocumentClick(formDataSuccessElementInner, removeSuccessModal));
};

export const showErrorMessage = () => {
  body.append(formDataErrorElement);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  body.addEventListener('keydown', onBodyKeydown);
  document.addEventListener('click', onDocumentClick(formDataErrorElementInner, removeErrorModal));
};

export const showDataErrorMessage = () => {
  body.append(serverDataErrorElement);
  setTimeout(() => {
    serverDataErrorElement.remove();
  }, REMOVE_SERVER_MESSAGE_TIMEOUT);
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

function onDocumentClick (element, cb) {
  return (evt) => {
    if (element && !element.contains(evt.target)) {
      cb();
    }
  };
}
