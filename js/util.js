// Генератор случайных чисел из заданного диапазона
const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};
export {getRandomNumber};


// Проверяет повторяются ли элементы в массиве
const hasDuplicates = (array) => array.some((x) => array.indexOf(x.toLowerCase()) !== array.lastIndexOf(x.toLowerCase()));
export {hasDuplicates};


// Проверяет нажата ли была клавиша Esc
const isEscapeKey = (evt) => evt.key === 'Escape';
export {isEscapeKey};


// Вывод сообщения об ошибке
const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orangered';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};
export {showAlertMessage};


// Устранение дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export {debounce};


// Сортировка массива объектов по длине комментариев
const sortArrayByCommentsLength = (array) => {
  array.sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  });
  return array;
};
export {sortArrayByCommentsLength};


// Сортировка массива объектов в случайном порядке
const sortArrayByRandom = (array) => {
  let j = 0;
  let temp = 0;
  for (let i = 0; i < array.length; i++) {
    j = getRandomNumber(0, array.length - 1);
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};
export {sortArrayByRandom};


//Функция, которая принимает строку и возвращает цифры из нее в виде целого положительного числа
const getNumbers = (string) => {
  string = String(string);
  string = string.replaceAll(' ', '');

  let exitNumber = '';
  for (let i = 0; i < string.length; i++) {
    exitNumber += (string[i] <= 9) ? string[i] : '';
  }

  return (exitNumber === '') ? NaN : Number(exitNumber);
};
export {getNumbers};
