import { getData } from './api.js';
import { createGallery } from './gallery.js';
import { manageLightbox } from './lightbox.js';
import { showDataErrorMessage } from './form-state';
import { submitImageForm } from './upload-form.js';

getData().then((data) => {
  createGallery(data);
  manageLightbox(data);
}).catch(() => {
  showDataErrorMessage();
});

submitImageForm();
