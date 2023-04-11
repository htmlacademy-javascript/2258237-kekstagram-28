import {renderBasicPhotos} from './main.js';
import {getBasicPhotos, getRandomPhotos, getSortedPhotos} from './filtered-photos.js';
import {debounce} from './util.js';

const filterForm = document.querySelector('.img-filters__form');
const filterButtons = filterForm.querySelectorAll('.img-filters__button');

const containerPhoto = document.querySelector('.pictures');


const clearPhotoContainer = () => {
  containerPhoto.querySelectorAll('a').forEach((miniPic) => {
    miniPic.remove();
  });
};


const renderPhotos = () => {
  renderBasicPhotos();

  const applyFilter = debounce((button) => {
    if (button.id === 'filter-default') {
      clearPhotoContainer();
      getBasicPhotos();
    }
    if (button.id === 'filter-random') {
      clearPhotoContainer();
      getRandomPhotos();
    }
    if (button.id === 'filter-discussed') {
      clearPhotoContainer();
      getSortedPhotos();
    }
  }, 500);

  filterForm.addEventListener('click', (evt) => {
    const button = evt.target;
    filterButtons.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });
    button.classList.add('img-filters__button--active');
    applyFilter(button);
  });
};

export {renderPhotos};
