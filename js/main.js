import {createPhotos} from './data.js';
import {drawUsersPhotos} from './photoGallery.js';
import {getNumbers} from './functions.js';
import {isEscapeKey} from './functions.js';
import {drawBigPhotoData} from './big-photo-modal.js';

const body = document.querySelector('body');
const modalBigPicture = document.querySelector('.big-picture');
const miniPicturesContainer = document.querySelector('.pictures');
const closeBigPictureButton = modalBigPicture.querySelector('.big-picture__cancel');


const usersPhotosData = createPhotos();
drawUsersPhotos(usersPhotosData);


const findCLickedPhotoId = (clickedPictureTarget, photosDataArray) => {
  const photoNumberName = getNumbers(clickedPictureTarget.src.slice(-10));
  for (let i = 0; i < photosDataArray.length; i++) {
    const currentPhotoNumberUrl = getNumbers(photosDataArray[i].url);
    if (photoNumberName === currentPhotoNumberUrl) {
      return photosDataArray[i].id;
    }
  }
};

const findCLickedPhotoObject = (clickedPhotoId, photosDataArray) => {
  for (let i = 0; i < photosDataArray.length; i++) {
    if (photosDataArray[i].id === clickedPhotoId) {
      return photosDataArray[i];
    }
  }
};

const openModalBigPicture = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const clickedPictureId = findCLickedPhotoId(evt.target, usersPhotosData);
    const clickedPictureData = findCLickedPhotoObject(clickedPictureId, usersPhotosData);
    drawBigPhotoData(clickedPictureData);

    modalBigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        modalBigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
      }
    });
  }
};

const closeModalBigPicture = () => {
  modalBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

miniPicturesContainer.addEventListener('click', openModalBigPicture);
closeBigPictureButton.addEventListener('click', closeModalBigPicture);
