// Генератор случайных чисел из заданного диапазона
const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

export {getRandomNumber};


// Проверяет повторяются ли элементы в массиве
function hasDuplicates(array) {
  return array.some((x) => array.indexOf(x) !== array.lastIndexOf(x));
}

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
