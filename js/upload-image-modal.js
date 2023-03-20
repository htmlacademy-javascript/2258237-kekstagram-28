/* global Pristine:readonly */

const body = document.querySelector('body');

const modalUploadPhoto = document.querySelector('.img-upload__overlay');
const buttonCloseModalUploadPhoto = modalUploadPhoto.querySelector('.img-upload__cancel');

const photoUploadForm = document.querySelector('.img-upload__form');
const inputUploadImage = photoUploadForm.querySelector('#upload-file');


const pristine = new Pristine(photoUploadForm);

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

//Закрытие окна клавишей Esc
import {isEscapeKey} from './functions.js';
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

//Закрытие окна
const closeModal = () => {
  modalUploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  inputUploadImage.value = null;

  document.removeEventListener('keydown', onModalEscKeydown);
  buttonCloseModalUploadPhoto.removeEventListener('click', closeModal);
};

//Открытие окна
inputUploadImage.addEventListener('change', () => {
  modalUploadPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseModalUploadPhoto.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEscKeydown);
});


