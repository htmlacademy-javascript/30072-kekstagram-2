import { generatePhotos } from './data.js';
import { createGallery } from './gallery.js';
import { managePhotoModal } from './photo-modal.js';

const photos = generatePhotos();

createGallery(photos);
managePhotoModal(photos);
