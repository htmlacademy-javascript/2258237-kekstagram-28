const modalUploadPhoto = document.querySelector('.img-upload__overlay');

const imagePreview = modalUploadPhoto.querySelector('.img-upload__preview');

const sliderBlock = modalUploadPhoto.querySelector('.img-upload__effect-level');
const slideSwitcher = sliderBlock.querySelector('.effect-level__slider');
const sliderValue = sliderBlock.querySelector('.effect-level__value');
const radioButtons = modalUploadPhoto.querySelectorAll('input[type="radio"]');


noUiSlider.create(slideSwitcher, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

sliderBlock.classList.add('visually-hidden');

slideSwitcher.noUiSlider.on('update', () => {
  sliderValue.value = slideSwitcher.noUiSlider.get();

  if (imagePreview.classList.contains('effects__preview--chrome')) {
    imagePreview.style.filter = `grayscale(${sliderValue.value})`;
  } else if (imagePreview.classList.contains('effects__preview--sepia')) {
    imagePreview.style.filter = `sepia(${sliderValue.value})`;
  } else if (imagePreview.classList.contains('effects__preview--marvin')) {
    imagePreview.style.filter = `invert(${sliderValue.value}%)`;
  } else if (imagePreview.classList.contains('effects__preview--phobos')) {
    imagePreview.style.filter = `blur(${sliderValue.value}px)`;
  } else if (imagePreview.classList.contains('effects__preview--heat')) {
    imagePreview.style.filter = `brightness(${sliderValue.value})`;
  } else {
    imagePreview.style.removeProperty('filter');
  }
});

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', () => {
    const currentEffect = radioButtons[i].value;

    imagePreview.classList.remove('effects__preview--chrome');
    imagePreview.classList.remove('effects__preview--sepia');
    imagePreview.classList.remove('effects__preview--marvin');
    imagePreview.classList.remove('effects__preview--phobos');
    imagePreview.classList.remove('effects__preview--heat');

    if (currentEffect === 'none') {
      sliderBlock.classList.add('visually-hidden');
      slideSwitcher.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 0,
        }
      });
    } else {
      sliderBlock.classList.remove('visually-hidden');
      imagePreview.classList.add(`effects__preview--${currentEffect}`);
    }


    if (currentEffect === 'chrome' || currentEffect === 'sepia') {
      slideSwitcher.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }

    if (currentEffect === 'marvin') {
      slideSwitcher.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }

    if (currentEffect === 'phobos') {
      slideSwitcher.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }

    if (currentEffect === 'heat') {
      slideSwitcher.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  });
}
