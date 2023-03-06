import {createPhotos} from './data.js';

const usersPhotosData = createPhotos();
const usersPhotoGallery = document.querySelector('.pictures');
const usersPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

usersPhotosData.forEach((photoCard) => {
  const photoElement = usersPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoCard.url;
  photoElement.querySelector('.picture__likes').textContent = photoCard.likes;
  photoElement.querySelector('.picture__comments').textContent = photoCard.comments.length;

  similarListFragment.append(photoElement);
});

const drawUsersPhotos = () => {
  usersPhotoGallery.append(similarListFragment);
};

export {drawUsersPhotos};
