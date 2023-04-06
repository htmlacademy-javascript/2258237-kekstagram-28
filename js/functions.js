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


const isEscapeKey = (evt) => evt.key === 'Escape';

export {getNumbers, isEscapeKey};
