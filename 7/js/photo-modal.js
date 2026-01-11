import { photos } from './data.js';

const bodyElement = document.querySelector('body');
const photoModal = document.querySelector('.big-picture');
const photoModalImage = photoModal.querySelector('.big-picture__img img');
const photoModalCloseButton = photoModal.querySelector('.big-picture__cancel');
const photoLikesCount = photoModal.querySelector('.likes-count');
const photoCounter = photoModal.querySelector('.social__comment-count');
const photoDescription = photoModal.querySelector('.social__caption');
const photoCommentsLoader = photoModal.querySelector('.comments-loader');
const commentsTemplate = photoModal.querySelector('.social__comments');
const commentTemplate = photoModal.querySelector('.social__comment');

const createFullPhoto = (imageId) => {
  const currentPhoto = photos.find((photo) => photo.id === imageId);

  photoModalImage.src = currentPhoto.url;
  photoLikesCount.textContent = currentPhoto.likes;
  photoDescription.textContent = currentPhoto.description;

  const commentFragment = document.createDocumentFragment();

  currentPhoto.comments.forEach((comment) => {
    const commentTemplateCloned = commentTemplate.cloneNode(true);

    commentTemplateCloned.querySelector('.social__picture').src = comment.avatar;
    commentTemplateCloned.querySelector('.social__picture').alt = comment.name;
    commentTemplateCloned.querySelector('.social__text').textContent = comment.message;

    commentFragment.append(commentTemplateCloned);
  });

  commentsTemplate.innerHTML = '';
  commentsTemplate.append(commentFragment);
  photoCounter.classList.add('hidden');
  photoCommentsLoader.classList.add('hidden');
};

const openModal = () => {
  photoModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const closeModal = () => {
  photoModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const handleGalleryImageClick = (evt) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains('picture__img')) {
    evt.preventDefault();

    createFullPhoto(Number(currentElement.dataset.imageId));

    openModal();
  }
};

const handleCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const handleCloseButtonKeydown = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeModal();
  }
};

export const managePhotoModal = () => {
  document.addEventListener('click', handleGalleryImageClick);
  photoModalCloseButton.addEventListener('click', handleCloseButtonClick);
  document.addEventListener('keydown', handleCloseButtonKeydown);
};
