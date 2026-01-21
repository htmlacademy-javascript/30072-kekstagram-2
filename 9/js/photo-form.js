const bodyElement = document.querySelector('body');
const uploadInput = document.querySelector('.img-upload__input');
const modalOverlay = document.querySelector('.img-upload__overlay');
const closeModalButton = document.querySelector('.img-upload__cancel');

const imageForm = document.querySelector('.img-upload__form');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const COMMENT_MAX_LENGTH = 140;

const HASHTAGS_MAX_AMOUNT = 5;
const HASHTAG_MAX_LENGTH = 20;

const openModal = () => {
  bodyElement.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  modalOverlay.classList.add('hidden');
  uploadInput.value = '';
  imageForm.reset();
};

const handleUploadInputClick = (evt) => {
  evt.preventDefault();
  openModal();
};

const handleCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const handleCloseModalKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (!(document.activeElement === hashtagsInput || document.activeElement === commentTextarea)) {
      closeModal();
    }
  }
};

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const checkHashtagValidity = () => {
  if (!hashtagsInput.value) {
    return true;
  }

  const purifiedInputValue = hashtagsInput.value.trim().toLowerCase();
  const hashtagsArray = purifiedInputValue.split(/\s+/);
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

export const submitImageForm = () => {
  pristine.addValidator(hashtagsInput, checkHashtagValidity);
  pristine.addValidator(commentTextarea, checkCommentValidity);

  uploadInput.addEventListener('change', handleUploadInputClick);

  closeModalButton.addEventListener('click', handleCloseButtonClick);

  document.addEventListener('keydown', handleCloseModalKeydown);

  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate(hashtagsInput, commentTextarea)) {
      imageForm.submit();
    }
  });
};
