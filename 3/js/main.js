const SIMILAR_PHOTOS_COUNT = 25;
const descriptionExamples = ['Смейтесь как только умеете, любите столько, сколько живете','Если смогу, я сделаю это. Конец истории','Помните: вы единственный человек, который может наполнить ваш мир солнечным светом','Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали','Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон','Улыбка — единственный тренд в моде, который актуален всегда','Никогда не ищите свое счастье там, где вы его однажды потеряли','Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой','Моя жизнь меняется, потому что меняю ее я','Всегда начинайте свой день с хороших людей и кофе'];
const messageExamples = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const nameExamples = ['Артем','Анна','Дарья','Марк','Арина','Давид','София','Ева','Роман','Мария'];

const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
}

function creatIdGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length > (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  }
}

const generateIdNumber = creatIdGenerator(1, SIMILAR_PHOTOS_COUNT);
const generateIdPhoto = creatIdGenerator(1, SIMILAR_PHOTOS_COUNT);
const generateIdComment = creatIdGenerator(1, 1000);


const createComment = () => {

  return {
    id: generateIdComment(),
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: messageExamples[getRandomNumber(0,5)],
    name: nameExamples[getRandomNumber(0,9)],
  }
}

const createPhotoDescription = () => {

  return {
    id: generateIdNumber(),
    url: 'photos/' + generateIdPhoto(),
    description: descriptionExamples[getRandomNumber(0,9)],
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1, 6)}, createComment),
  }
}


const objects = Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhotoDescription);
