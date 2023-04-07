import {getBasicPhotos, getRandomPhotos, getSortedPhotos} from './main.js';
const filterForm = document.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

const containerPhoto = document.querySelector('.pictures');

const clearPhotoContainer = () => {
  containerPhoto.querySelectorAll('a').forEach((miniPic) => {
    miniPic.remove();
  });
};

const getCurrentFilter = (chosenFilter) => {
  const filter = chosenFilter.id;
  if (filter === 'filter-default') {
    clearPhotoContainer();
    setTimeout(getBasicPhotos, 500);
  } else if (filter === 'filter-random') {
    clearPhotoContainer();
    setTimeout(getRandomPhotos, 500);
  } else {
    clearPhotoContainer();
    setTimeout(getSortedPhotos, 500);
  }
};

const changeFilterPhoto = () => {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', () => {
      filterButtons.forEach((element) => {
        element.classList.remove('img-filters__button--active');
      });
      filterButtons[i].classList.add('img-filters__button--active');

      getCurrentFilter(filterButtons[i]);
    });
  }
};

export {changeFilterPhoto};
