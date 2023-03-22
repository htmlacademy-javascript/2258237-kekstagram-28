// Генератор случайных чисел из заданного диапазона
const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

export {getRandomNumber};


// Проверяет повторяются ли элементы в массиве
function hasDuplicates(array) {
  return array.some((x) => array.indexOf(x) !== array.lastIndexOf(x));
};

export {hasDuplicates};


// Проверяет нажата ли была клавиша Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};
