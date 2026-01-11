import { photos } from './data.js';


export const createGalley = () => {
  const photoTemplate = document.querySelector('#picture').content;
  const photoWrapper = document.querySelector('.pictures');
  const photoFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoTemplateCloned = photoTemplate.cloneNode(true);
    photoTemplateCloned.querySelector('.picture__img').src = photo.url;
    photoTemplateCloned.querySelector('.picture__img').alt = photo.description;
    photoTemplateCloned.querySelector('.picture__img').dataset.imageId = photo.id;
    photoTemplateCloned.querySelector('.picture__comments').textContent = photo.comments.length;
    photoTemplateCloned.querySelector('.picture__likes').textContent = photo.likes;
    photoFragment.append(photoTemplateCloned);
  });

  photoWrapper.append(photoFragment);
};

