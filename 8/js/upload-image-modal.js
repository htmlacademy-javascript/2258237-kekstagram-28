import {hasDuplicates} from './util.js';
import {isEscapeKey} from './util.js';

const MAX_HASHTAGS = 5;

const body = document.querySelector('body');

const modalUploadPhoto = document.querySelector('.img-upload__overlay');
const buttonCloseModalUploadPhoto = modalUploadPhoto.querySelector('.img-upload__cancel');

const photoUploadForm = document.querySelector('.img-upload__form');
const inputUploadImage = photoUploadForm.querySelector('#upload-file');
const inputComment = photoUploadForm.querySelector('.text__description');
const inputHastags = photoUploadForm.querySelector('.text__hashtags');


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

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // const isValid =
  pristine.validate();
});


//Закрытие окна
const closeModal = () => {
  modalUploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  inputUploadImage.value = null;

  document.removeEventListener('keydown', onModalEscKeydown);
  buttonCloseModalUploadPhoto.removeEventListener('click', closeModal);
};

//Закрытие окна клавишей Esc
function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

//Открытие окна
inputUploadImage.addEventListener('change', () => {
  modalUploadPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseModalUploadPhoto.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEscKeydown);
});

//Отменяет закрытие окна если в фокусе поле ввода
inputComment.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

inputHastags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
