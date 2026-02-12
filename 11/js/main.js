import { getData } from './api.js';
import { createGallery } from './gallery.js';
import { managePhotoModal } from './photo-modal.js';
import { submitImageForm, showDataErrorMessage } from './photo-form.js';

getData().then((data) => {
  createGallery(data);
  managePhotoModal(data);
}).catch(() => {
  showDataErrorMessage();
});

submitImageForm();
