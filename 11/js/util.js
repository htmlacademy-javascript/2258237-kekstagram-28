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


// Устранение дребезга

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {debounce};

// Пропуск кадров

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {throttle};