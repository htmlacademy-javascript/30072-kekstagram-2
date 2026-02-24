import { getData } from './api.js';
import { createGallery } from './gallery.js';
import { showFilters, manageFilters } from './filters';
import { manageLightbox } from './lightbox.js';
import { showDataErrorMessage } from './form-state';
import { submitImageForm } from './upload-form.js';

getData().then((data) => {
  createGallery(data);
  showFilters();
  manageFilters(data);
  manageLightbox(data);
}).catch(() => {
  showDataErrorMessage();
});

submitImageForm();
