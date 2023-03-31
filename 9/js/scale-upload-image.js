const modalUploadPhoto = document.querySelector('.img-upload__overlay');

const imagePreview = modalUploadPhoto.querySelector('.img-upload__preview');
const smallerBtn = modalUploadPhoto.querySelector('.scale__control--smaller');
const biggerBtn = modalUploadPhoto.querySelector('.scale__control--bigger');
const scaleValue = modalUploadPhoto.querySelector('.scale__control--value');


const checkBiggerScaleButton = () => {
  if (scaleValue.value === '100%') {
    biggerBtn.disabled = true;
  } else {
    biggerBtn.disabled = false;
  }
};

const checkSmallerScaleButton = () => {
  if (scaleValue.value === '25%') {
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
  currentValue += 25;
  scaleValue.value = `${currentValue}%`;
  changePreviewImageScale(currentValue);
  checkBiggerScaleButton();
  checkSmallerScaleButton();
});

smallerBtn.addEventListener('click', () => {
  let currentValue = checkCurrentScaleValue(scaleValue.value);
  currentValue -= 25;
  scaleValue.value = `${currentValue}%`;
  changePreviewImageScale(currentValue);
  checkBiggerScaleButton();
  checkSmallerScaleButton();
});


