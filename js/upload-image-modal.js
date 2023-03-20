/* global Pristine:readonly */

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

//Открытие окна
inputUploadImage.addEventListener('change', () => {
  modalUploadPhoto.classList.remove('hidden');

  buttonCloseModalUploadPhoto.addEventListener('click', () => {
    modalUploadPhoto.classList.add('hidden');
  });
});
