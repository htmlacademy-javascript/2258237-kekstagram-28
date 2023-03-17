// Генератор случайных чисел из заданного диапазона

const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

export {getRandomNumber};
