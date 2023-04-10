const SCALE_STEP = 25;
const MAX_SCALE = '100%';
const MIN_SCALE = '25%';

const modalUploadPhoto = document.querySelector('.img-upload__overlay');

const imagePreview = modalUploadPhoto.querySelector('.img-upload__preview').querySelector('img');
const smallerBtn = modalUploadPhoto.querySelector('.scale__control--smaller');
const biggerBtn = modalUploadPhoto.querySelector('.scale__control--bigger');
const scaleValue = modalUploadPhoto.querySelector('.scale__control--value');


const checkBiggerScaleButton = () => {
  if (scaleValue.value === MAX_SCALE) {
    biggerBtn.disabled = true;
  } else {
    biggerBtn.disabled = false;
  }
};

const checkSmallerScaleButton = () => {
  if (scaleValue.value === MIN_SCALE) {
    smallerBtn.disabled = true;
  } else {
    smallerBtn.disabled = false;
  }
};

const changePreviewImageScale = (value) => {
  const test = value / 100;
  imagePreview.style.transform = `scale(${test})`;
};

const checkCurrentScaleValue = (value) => Number(value.slice(0, value.length - 1));

checkBiggerScaleButton();

biggerBtn.addEventListener('click', () => {
  let currentValue = checkCurrentScaleValue(scaleValue.value);
  currentValue += SCALE_STEP;
  scaleValue.value = `${currentValue}%`;
  changePreviewImageScale(currentValue);
  checkBiggerScaleButton();
  checkSmallerScaleButton();
});

smallerBtn.addEventListener('click', () => {
  let currentValue = checkCurrentScaleValue(scaleValue.value);
  currentValue -= SCALE_STEP;
  scaleValue.value = `${currentValue}%`;
  changePreviewImageScale(currentValue);
  checkBiggerScaleButton();
  checkSmallerScaleButton();
});

//Сброс наложения масштаба
const resetScaleOnPicture = () => {
  imagePreview.removeAttribute('style');
  scaleValue.value = MAX_SCALE;
  checkBiggerScaleButton();
  checkSmallerScaleButton();
};

export {resetScaleOnPicture};
