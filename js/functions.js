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
