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
const successCloseButton = formDataSuccessElement.querySelector('.success__button');


export const showSuccessMessage = (closeModal) => {
  closeModal();
  body.append(formDataSuccessElement);
  successCloseButton.addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const showErrorMessage = () => {
  body.append(formDataErrorElement);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showDataErrorMessage = () => {
  body.append(serverDataErrorElement);
  setTimeout(() => {
    serverDataErrorElement.remove();
  }, REMOVE_SERVER_MESSAGE_TIMEOUT);
};

const removeSuccessModal = () => {
  formDataSuccessElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const removeErrorModal = () => {
  formDataErrorElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

function onSuccessCloseButtonClick (evt) {
  evt.preventDefault();
  removeSuccessModal();
}

function onTryAgainButtonClick (evt) {
  evt.preventDefault();
  removeErrorModal();
}

function onDocumentKeydown (evt) {
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

function onDocumentClick (evt) {
  if (!formDataErrorElementInner) {
    return;
  }

  if (!formDataErrorElementInner.contains(evt.target)) {
    removeErrorModal();
  }
}
