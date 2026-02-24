import { body } from './utils.js';

const LOADING_STEP = 5;

const photoModal = document.querySelector('.big-picture');
const photoModalImage = photoModal.querySelector('.big-picture__img img');
const photoModalCloseButton = photoModal.querySelector('.big-picture__cancel');
const photoLikesCount = photoModal.querySelector('.likes-count');
const photoDescription = photoModal.querySelector('.social__caption');
const commentsTemplate = photoModal.querySelector('.social__comments');
const commentTemplate = photoModal.querySelector('.social__comment');
const commentShownCount = photoModal.querySelector('.social__comment-shown-count');
const commentTotalCount = photoModal.querySelector('.social__comment-total-count');
const commentsLoader = photoModal.querySelector('.social__comments-loader');

const createFullPhoto = (imageId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === imageId);

  photoModalImage.src = currentPhoto.url;
  photoLikesCount.textContent = currentPhoto.likes;
  photoDescription.textContent = currentPhoto.description;

  const commentFragment = document.createDocumentFragment();
  const currentComments = currentPhoto.comments;

  commentTotalCount.textContent = currentComments.length;

  let shownComments = [];

  const renderComments = () => {
    const commentsChunk = currentComments.slice(0, shownComments.length + LOADING_STEP);
    shownComments = commentsChunk;

    shownComments.forEach((comment) => {
      const newComment = commentTemplate.cloneNode(true);

      newComment.querySelector('.social__picture').src = comment.avatar;
      newComment.querySelector('.social__picture').alt = comment.name;
      newComment.querySelector('.social__text').textContent = comment.message;

      commentFragment.append(newComment);
    });

    commentsTemplate.innerHTML = '';
    commentsTemplate.append(commentFragment);
    commentShownCount.textContent = shownComments.length;

    if (shownComments.length === currentComments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };
  renderComments();

  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments();
  });
};

const openModal = () => {
  photoModal.classList.remove('hidden');
  body.classList.add('modal-open');

  photoModalCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  photoModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentClick (evt, photos) {
  const currentElement = evt.target;
  if (currentElement.classList.contains('picture__img')) {
    evt.preventDefault();

    createFullPhoto(Number(currentElement.dataset.imageId), photos);

    openModal();
  }
}

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closeModal();
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

export const manageLightbox = (photos) => {
  document.addEventListener('click', (evt) => onDocumentClick(evt, photos));
};
