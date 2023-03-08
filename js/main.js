import {createPhotos} from './data.js';
import {drawUsersPhotos} from './photoGallery.js';

const usersPhotosData = createPhotos();

drawUsersPhotos(usersPhotosData);
