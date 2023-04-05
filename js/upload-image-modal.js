import {hasDuplicates, isEscapeKey} from './util.js';
import {resetFiltersOnPicture} from './effects-upload-image.js';
import {resetScaleOnPicture} from './scale-upload-image.js';

import './scale-upload-image.js';
import './effects-upload-image.js';

const MAX_HASHTAGS = 5;

const body = document.querySelector('body');

const modalUploadPhoto = document.querySelector('.img-upload__overlay');
const buttonCloseModalUploadPhoto = modalUploadPhoto.querySelector('.img-upload__cancel');

const photoUploadForm = document.querySelector('.img-upload__form');
const inputUploadImage = photoUploadForm.querySelector('#upload-file');
const inputComment = photoUploadForm.querySelector('.text__description');
const inputHastags = photoUploadForm.querySelector('.text__hashtags');

const successSendFormMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorSendFormMessageTemplate = document.querySelector('#error').content.querySelector('.error');


//Функция сброса формы
const resetFormData = () => {
  inputUploadImage.value = null;
  photoUploadForm.reset();
  resetFiltersOnPicture();
  resetScaleOnPicture();
};


//Проверка хештэгов
const splitHastags = (allHashtagsByString) => allHashtagsByString.split(' ');

const checkValidHashTag = (allHashtagsByString) => {
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const allHashtags = splitHastags(allHashtagsByString);

  if (allHashtagsByString === '') {
    return true;
  }

  for (let i = 0; i < allHashtags.length; i++) {
    if (!regexp.test(allHashtags[i])) {
      return false;
    }
  }

  return true;
};

const checkHashtagTotalNumber = (allHashtagsByString) => {
  const allHashtags = splitHastags(allHashtagsByString);
  return !(allHashtags.length > MAX_HASHTAGS);
};

const checkHashtagsRepeats = (allHashtagsByString) => {
  const allHashtags = splitHastags(allHashtagsByString);
  return !hasDuplicates(allHashtags);
};


//Создание валидации формы
const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
}, false);

pristine.addValidator(inputHastags, checkHashtagTotalNumber, 'Не более 5 хэш-тэгов');
pristine.addValidator(inputHastags, checkValidHashTag, 'Неподходящий хэш-тэг');
pristine.addValidator(inputHastags, checkHashtagsRepeats, 'Хэш-тэги не могут повторяться');


//Закрытие окна
const closeModalForm = () => {
  modalUploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  buttonCloseModalUploadPhoto.removeEventListener('click', () => {
    resetFormData();
    closeModalForm();
  });
};

//Закрытие окна клавишей Esc
function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    resetFormData();
    closeModalForm();
  }
}

//Открытие окна
inputUploadImage.addEventListener('change', () => {
  modalUploadPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseModalUploadPhoto.removeEventListener('click', () => {
    resetFormData();
    closeModalForm();
  });
  document.addEventListener('keydown', onModalEscKeydown);
});

//Отменяет закрытие окна если в фокусе поле ввода
inputComment.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

inputHastags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


const closeSendStatusModal = (statusMessage) => {
  document.querySelector(`.${statusMessage}`).remove();
};

const showSuccessSendFormMessage = () => {
  const similarListFragment = document.createDocumentFragment();
  const successSendFormMessage = successSendFormMessageTemplate.cloneNode(true);
  similarListFragment.append(successSendFormMessage);

  body.append(similarListFragment);

  const successSendFormMessageCloseButton = document.querySelector('.success__button');
  successSendFormMessageCloseButton.addEventListener('click', () => {
    closeSendStatusModal('success');
  });

  document.addEventListener('click', (e) => {
    const modalSuccess = document.querySelector('.success');
    const click = e.composedPath().includes(modalSuccess);
    if (click) {
      closeSendStatusModal('success');
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSendStatusModal('success');
    }
  });
};

const showErrorSendFormMessage = () => {
  const similarListFragment = document.createDocumentFragment();
  const errorSendFormMessage = errorSendFormMessageTemplate.cloneNode(true);
  similarListFragment.append(errorSendFormMessage);

  body.append(similarListFragment);

  const errorSendFormMessageCloseButton = document.querySelector('.error__button');
  errorSendFormMessageCloseButton.addEventListener('click', () => {
    document.querySelector('.error').remove();
  });

  document.addEventListener('click', (e) => {
    const modalSuccess = document.querySelector('.success');
    const click = e.composedPath().includes(modalSuccess);
    if (click) {
      closeSendStatusModal('error');
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSendStatusModal('error');
    }
  });
};


const setUserFormSubmit = () => {
  photoUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch('https://28.javascript.pages.academy/kekstagram',{
        method: 'POST',
        body: formData,
      },
      ).then(() => {
        inputUploadImage.value = null;
        photoUploadForm.reset();
        resetFiltersOnPicture();
        resetScaleOnPicture();
      }).then(() => {
        closeModalForm();
      }).then(() => {
        showSuccessSendFormMessage();
      }).catch(() => {
        inputUploadImage.value = null;
        closeModalForm();
        showErrorSendFormMessage();
      });
    }
  });
};

export {setUserFormSubmit};
