const usersPhotoGallery = document.querySelector('.pictures');
const usersPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const drawUsersPhotos = (photosData) => {

  const similarListFragment = document.createDocumentFragment();

  photosData.forEach((photoCard) => {
    const photoElement = usersPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoCard.url;
    photoElement.querySelector('.picture__likes').textContent = photoCard.likes;
    photoElement.querySelector('.picture__comments').textContent = photoCard.comments.length;

    similarListFragment.append(photoElement);
  });

  usersPhotoGallery.append(similarListFragment);
};

export {drawUsersPhotos};
