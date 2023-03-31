import {createPhotos} from './data.js';
import {drawUsersPhotos} from './photoGallery.js';
import {isEscapeKey} from './functions.js';
import {drawBigPhotoData} from './big-photo-modal.js';

const body = document.querySelector('body');
const modalBigPicture = document.querySelector('.big-picture');
const miniPicturesContainer = document.querySelector('.pictures');
const closeBigPictureButton = modalBigPicture.querySelector('.big-picture__cancel');


const commentLodaerButton = modalBigPicture.querySelector('.comments-loader');
import {workButtonLoadMore} from './big-photo-modal.js';


const usersPhotosData = createPhotos();
drawUsersPhotos(usersPhotosData);


let commentsLoaderButtonClickHandler = null; //Для объявления функции доп комментов

const findClickedPhotoObject = (clickedPhotoId, photosDataArray) => {
  return photosDataArray.find((currentElement) => {
    return currentElement.id === clickedPhotoId;
  });
};

const closeModalBigPicture = () => {
  modalBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);

  commentLodaerButton.classList.remove('hidden');
  commentLodaerButton.removeEventListener('click', commentsLoaderButtonClickHandler);
  commentsLoaderButtonClickHandler = null;
};


const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPicture();
  }
};


const openModalBigPicture = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const clickedPictureId = Number(evt.target.getAttribute('data-id'));
    const clickedPictureData = findClickedPhotoObject(clickedPictureId, usersPhotosData);
    drawBigPhotoData(clickedPictureData);

    modalBigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    commentsLoaderButtonClickHandler = workButtonLoadMore(clickedPictureData.comments);
    commentLodaerButton.addEventListener('click', commentsLoaderButtonClickHandler);

    document.addEventListener('keydown', onModalEscKeydown);
  }
};


miniPicturesContainer.addEventListener('click', openModalBigPicture);
closeBigPictureButton.addEventListener('click', closeModalBigPicture);


import './upload-image-modal.js';
