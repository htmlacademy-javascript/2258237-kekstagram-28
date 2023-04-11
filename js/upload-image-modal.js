import {hasDuplicates, isEscapeKey} from './util.js';
import {resetFiltersOnPicture} from './effects-upload-image.js';
import {resetScaleOnPicture} from './scale-upload-image.js';

const MAX_HASHTAGS = 5;
const FILE_TYPES = ['png', 'jpeg', 'jpg'];

const body = document.querySelector('body');

const modalUploadPhoto = document.querySelector('.img-upload__overlay');
const buttonCloseModalUploadPhoto = modalUploadPhoto.querySelector('.img-upload__cancel');

const photoUploadForm = document.querySelector('.img-upload__form');
const previewImage = photoUploadForm.querySelector('.img-upload__preview').querySelector('img');
const inputUploadImage = photoUploadForm.querySelector('#upload-file');
const inputComment = photoUploadForm.querySelector('.text__description');
const inputHastags = photoUploadForm.querySelector('.text__hashtags');
const submitButton = photoUploadForm.querySelector('.img-upload__submit');

const successSendFormMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorSendFormMessageTemplate = document.querySelector('#error').content.querySelector('.error');


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
  const allLowerHashtags = splitHastags(allHashtagsByString).map((x) => x.toLowerCase());
  return !hasDuplicates(allLowerHashtags);
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

  buttonCloseModalUploadPhoto.addEventListener('click', () => {
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


//Показ и скрытие сообщения о статусе отправки формы
const closeSendStatusModal = (statusMessage) => {
  if (statusMessage === 'success') {
    document.removeEventListener('keydown', onSuccessMsgEscKeydown);
  } else {
    document.removeEventListener('keydown', onErrorMsgEscKeydown);
  }
  document.querySelector(`.${statusMessage}`).remove();
};

function onSuccessMsgEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendStatusModal('success');
  }
}

function onErrorMsgEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendStatusModal('error');
  }
}

const showSuccessSendFormMessage = () => {
  const similarListFragment = document.createDocumentFragment();
  const successSendFormMessage = successSendFormMessageTemplate.cloneNode(true);
  similarListFragment.append(successSendFormMessage);
  body.append(similarListFragment);

  const successSendFormMessageCloseButton = document.querySelector('.success__button');
  successSendFormMessageCloseButton.addEventListener('click', () => {
    closeSendStatusModal('success');
  });

  successSendFormMessage.addEventListener('click', (evt) => {
    if (evt.target !== successSendFormMessage.children[0] && evt.target !== successSendFormMessage.children[0].children[0] && evt.target !== successSendFormMessage.children[0].children[1]) {
      closeSendStatusModal('success');
    }
  });

  document.addEventListener('keydown', onSuccessMsgEscKeydown);
};

const showErrorSendFormMessage = () => {
  const similarListFragment = document.createDocumentFragment();
  const errorSendFormMessage = errorSendFormMessageTemplate.cloneNode(true);
  similarListFragment.append(errorSendFormMessage);
  body.append(similarListFragment);

  const errorSendFormMessageCloseButton = document.querySelector('.error__button');
  errorSendFormMessageCloseButton.addEventListener('click', () => {
    closeSendStatusModal('error');
  });

  errorSendFormMessage.addEventListener('click', (evt) => {
    if (evt.target !== errorSendFormMessage.children[0] && evt.target !== errorSendFormMessage.children[0].children[0] && evt.target !== errorSendFormMessage.children[0].children[1]) {
      closeSendStatusModal('error');
    }
  });

  document.addEventListener('keydown', onErrorMsgEscKeydown);
};


const setUserFormSubmit = () => {
  photoUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      submitButton.disabled = true;

      fetch('https://28.javascript.pages.academy/kekstagram',{
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw new Error(`${response.status} — ${response.statusText}`);
        })
        .then(() => {
          inputUploadImage.value = null;
          photoUploadForm.reset();
          resetFiltersOnPicture();
          resetScaleOnPicture();
        }).then(() => {
          closeModalForm();
        }).then(() => {
          submitButton.disabled = false;
          showSuccessSendFormMessage();
        }).catch(() => {
          submitButton.disabled = false;
          showErrorSendFormMessage();
        });
    }
  });
};


inputUploadImage.addEventListener('change', () => {
  const file = inputUploadImage.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});

export {setUserFormSubmit};
