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


const slideSwitcher = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');

const radios = document.querySelectorAll('input[type="radio"]');

noUiSlider.create(slideSwitcher, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

slideSwitcher.noUiSlider.on('update', (...rest) => {
  console.log(rest);
  sliderValue.value = slideSwitcher.noUiSlider.get();
  console.log(sliderValue.value);
});



