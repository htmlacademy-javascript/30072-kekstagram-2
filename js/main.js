import { generatePhotos } from './data.js';
import { createGallery } from './gallery.js';
import { managePhotoModal } from './photo-modal.js';
import { submitImageForm } from './photo-form.js';

const photos = generatePhotos();

createGallery(photos);
managePhotoModal(photos);
submitImageForm();
