import {drawUsersPhotos} from './photoGallery.js';
import {isEscapeKey} from './functions.js';
import {drawBigPhotoData, workButtonLoadMore} from './big-photo-modal.js';
import {getRandomNumber, showAlertMessage} from './util.js';

const body = document.querySelector('body');
const modalBigPicture = document.querySelector('.big-picture');
const miniPicturesContainer = document.querySelector('.pictures');
const closeBigPictureButton = modalBigPicture.querySelector('.big-picture__cancel');

const commentLodaerButton = modalBigPicture.querySelector('.comments-loader');

const filterBlock = document.querySelector('.img-filters');

let commentsLoaderButtonClickHandler = null; //Для объявления функции доп комментов


const sortArrayByComments = (array) => {
  array.sort((a, b) => {
    if (a.comments.length> b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  });
  return array;
}

const sortArrayByRandom = (array) => {
  let j = 0;
  let temp = 0;
  for (let i = 0; i < array.length; i++) {
    j = getRandomNumber(0, array.length - 1);
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

const getBasicPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((datas) => {
    drawUsersPhotos(datas, datas.length);
  });
}
export {getBasicPhotos};

const getRandomPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((datas) => {
    drawUsersPhotos(sortArrayByRandom(datas), 10);
  });
}
export {getRandomPhotos};

const getSortedPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((datas) => {
    drawUsersPhotos(sortArrayByComments(datas), datas.length);
  });
}
export {getSortedPhotos};

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((datas) => {
    drawUsersPhotos(datas, datas.length);

    const openModalBigPicture = (evt) => {

      if (evt.target.matches('.picture__img')) {
        const clickedPictureId = Number(evt.target.getAttribute('data-id'));
        const clickedPictureData = findClickedPhotoObject(clickedPictureId, datas);
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
  })
  .then(() => {
    filterBlock.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    showAlertMessage('Не удалось загрузить данные с сервера. Попробуйте ещё раз');
  });


function findClickedPhotoObject (clickedPhotoId, photosDataArray) {
  return photosDataArray.find((currentElement) => currentElement.id === clickedPhotoId);
}


function closeModalBigPicture () {
  modalBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);

  commentLodaerButton.classList.remove('hidden');
  commentLodaerButton.removeEventListener('click', commentsLoaderButtonClickHandler);
  commentsLoaderButtonClickHandler = null;
}


function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPicture();
  }
}

import { setUserFormSubmit } from './upload-image-modal.js';

setUserFormSubmit();


import { changeFilterPhoto } from './filter-search-photo.js';

changeFilterPhoto();
