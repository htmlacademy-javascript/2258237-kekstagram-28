import {drawUsersPhotos} from './draw-photos.js';
import {drawBigPhotoData, workButtonLoadMore} from './big-photo-modal.js';
import {isEscapeKey, showAlertMessage} from './util.js';
import {renderPhotos} from './filter-search-photo.js';
import {setUserFormSubmit} from './upload-image-modal.js';


const body = document.querySelector('body');
const modalBigPicture = document.querySelector('.big-picture');
const miniPicturesContainer = document.querySelector('.pictures');
const closeBigPictureButton = modalBigPicture.querySelector('.big-picture__cancel');

const commentLodaerButton = modalBigPicture.querySelector('.comments-loader');

const filterBlock = document.querySelector('.img-filters');


let onCommentsLoaderButtonClick = null; //Для объявления функции доп комментов

const findClickedPhotoObject = (clickedPhotoId, photosDataArray) => photosDataArray.find((currentElement) => currentElement.id === clickedPhotoId);


const createModalWindow = (data) =>
  (evt) => {
    if (evt.target.matches('.picture__img') || evt.target.matches('.picture__info') || evt.target.matches('.picture__comments') || evt.target.matches('.picture__likes')) {
      const clickedPictureId = Number(evt.target.getAttribute('data-id'));
      const clickedPictureData = findClickedPhotoObject(clickedPictureId, data);
      drawBigPhotoData(clickedPictureData);

      modalBigPicture.classList.remove('hidden');
      body.classList.add('modal-open');

      onCommentsLoaderButtonClick = workButtonLoadMore(clickedPictureData.comments);
      commentLodaerButton.addEventListener('click', onCommentsLoaderButtonClick);
      document.addEventListener('keydown', onModalEscKeydown);
    }
  };


const drawPhotos = (data) => {
  drawUsersPhotos(data, data.length);
  const openModalBigPicture = createModalWindow(data);

  miniPicturesContainer.addEventListener('click', openModalBigPicture);
  closeBigPictureButton.addEventListener('click', closeModalBigPicture);
  filterBlock.classList.remove('img-filters--inactive');
};


const renderBasicPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
      drawPhotos(data);
    })
    .catch(() => {
      showAlertMessage('Не удалось загрузить данные с сервера. Попробуйте ещё раз');
    });
};

function closeModalBigPicture () {
  modalBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);

  commentLodaerButton.classList.remove('hidden');
  commentLodaerButton.removeEventListener('click', onCommentsLoaderButtonClick);
  onCommentsLoaderButtonClick = null;
}


function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalBigPicture();
  }
}


setUserFormSubmit();
renderPhotos();

export {renderBasicPhotos};
