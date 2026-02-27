import { getData } from './api.js';
import { createGallery } from './gallery.js';
import { initFilters } from './filters.js';
import { manageLightbox } from './lightbox.js';
import { showDataErrorMessage } from './form-messages.js';
import { submitImageForm } from './upload-form.js';

getData().then((data) => {
  createGallery(data);
  initFilters(data);
  manageLightbox(data);
}).catch(() => {
  showDataErrorMessage();
});

submitImageForm();
