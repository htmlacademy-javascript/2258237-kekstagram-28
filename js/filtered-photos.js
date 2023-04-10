import {drawUsersPhotos} from './draw-photos.js';
import {sortArrayByCommentsLength, sortArrayByRandom, showAlertMessage} from './util.js';

const COUNT_OF_RANDOM_PHOTOS = 10;


const getBasicPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((datas) => {
      drawUsersPhotos(datas, datas.length);
    })
    .catch(() => {
      showAlertMessage('Не удалось загрузить данные с сервера. Попробуйте ещё раз');
    });
};

const getRandomPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((datas) => {
      drawUsersPhotos(sortArrayByRandom(datas), COUNT_OF_RANDOM_PHOTOS);
    })
    .catch(() => {
      showAlertMessage('Не удалось загрузить данные с сервера. Попробуйте ещё раз');
    });
};

const getSortedPhotos = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((datas) => {
      drawUsersPhotos(sortArrayByCommentsLength(datas), datas.length);
    })
    .catch(() => {
      showAlertMessage('Не удалось загрузить данные с сервера. Попробуйте ещё раз');
    });
};

export {getBasicPhotos, getRandomPhotos, getSortedPhotos};
