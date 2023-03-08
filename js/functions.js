//Функция для проверки длины строки

const checkStringLength = (string, maxLength) => string.length <= maxLength;

//Функция для проверки, является ли строка палиндромом

const checkStringPalin = (string) => {
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  let compareString = '';
  for (let i = 0; i < string.length; i++) {
    compareString += string.at(-i - 1);
  }

  return string === compareString;
};

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

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины

const addSymbols = (string, minLength, extraSymbols) => {
  let newString = '';

  if (string.length >= minLength) {
    return string;
  } else {

    for (let i = 0; i < (minLength - string.length) % extraSymbols.length ; i++) {
      newString += extraSymbols.at(i);
    }

    for (let i = 0; i < Math.floor((minLength - string.length) / extraSymbols.length); i++) {
      newString += extraSymbols;
    }

    newString += string;

    return newString;
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getNumbers, isEscapeKey};
