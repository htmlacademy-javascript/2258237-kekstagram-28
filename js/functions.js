//Функция для проверки длины строки

let checkStringLength = function (string, maxLength) {
  return (string.length <= maxLength) ? true : false;
}

//Функция для проверки, является ли строка палиндромом

let checkStringPalin = function (string) {
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  let compareString = '';
  for (let i = 0; i < string.length; i++) {
    compareString += string.at(-i - 1);
  }

  return (string === compareString) ? true : false;
}

//Функция, которая принимает строку и возвращает цифры из нее в виде целого положительного числа

let getNumbers = function (string) {
  string = String(string);
  string = string.replaceAll(' ', '');

  let exitNumber = '';
  for (let i = 0; i < string.length; i++) {
    exitNumber += (string[i] <= 9) ? string[i] : '';
  }

  return (exitNumber === '') ? NaN : Number(exitNumber);
}
