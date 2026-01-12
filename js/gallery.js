const photoTemplate = document.querySelector('#picture').content;
const photoWrapper = document.querySelector('.pictures');

export const createGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photo.url;
    newPhoto.querySelector('.picture__img').alt = photo.description;
    newPhoto.querySelector('.picture__img').dataset.imageId = photo.id;
    newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    newPhoto.querySelector('.picture__likes').textContent = photo.likes;
    fragment.append(newPhoto);
  });

  photoWrapper.append(fragment);
};

