const usersPhotoGallery = document.querySelector('.pictures');
const usersPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const drawUsersPhotos = (photosData, photosCount) => {
  const similarListFragment = document.createDocumentFragment();

  for (let i = 0; i < photosCount; i++) {
    const photoElement = usersPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photosData[i].url;
    photoElement.querySelector('.picture__likes').textContent = photosData[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photosData[i].comments.length;

    photoElement.querySelector('.picture__img').setAttribute('data-id', photosData[i].id);

    similarListFragment.append(photoElement);
  }

  usersPhotoGallery.append(similarListFragment);
};

export {drawUsersPhotos};
