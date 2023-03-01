const SIMILAR_PHOTOS_COUNT = 25;
const SIMILAR_AVATARS_COUNT = 6;
const SIMILAR_COMMENTARIES_ID = 1000;
const MAX_COMMENTARIES_ON_PHOTO = 6;
const MIN_LIKES_ON_PHOTO = 15;
const MAX_LIKES_ON_PHOTO = 200;
const descriptionExamples = ['Смейтесь как только умеете, любите столько, сколько живете','Если смогу, я сделаю это. Конец истории','Помните: вы единственный человек, который может наполнить ваш мир солнечным светом','Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали','Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон','Улыбка — единственный тренд в моде, который актуален всегда','Никогда не ищите свое счастье там, где вы его однажды потеряли','Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой','Моя жизнь меняется, потому что меняю ее я','Всегда начинайте свой день с хороших людей и кофе'];
const messageExamples = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const nameExamples = ['Артем','Анна','Дарья','Марк','Арина','Давид','София','Ева','Роман','Мария'];

const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
}

function createIdGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length > (max - min + 1)) {
      console.error('Исчерпан лимит уникальных идентификаторов');
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  }
}

function createOrderedIdGenerator (min) {
  let previousValues = min;

  return function () {
    return previousValues++;
  }
}

const generateIdNumber = createOrderedIdGenerator(1);
const generateIdPhoto = createIdGenerator(1, SIMILAR_PHOTOS_COUNT);
const generateIdComment = createIdGenerator(1, SIMILAR_COMMENTARIES_ID);


const createComment = () => {

  return {
    id: generateIdComment(),
    avatar: 'img/avatar-' + getRandomNumber(1, SIMILAR_AVATARS_COUNT) + '.svg',
    message: messageExamples[getRandomNumber(0, messageExamples.length - 1)],
    name: nameExamples[getRandomNumber(0, nameExamples.length - 1)],
  }
}

const createPhotoDescription = () => {

  return {
    id: generateIdNumber(),
    url: 'photos/' + generateIdPhoto(),
    description: descriptionExamples[getRandomNumber(0, descriptionExamples.length - 1)],
    likes: getRandomNumber(MIN_LIKES_ON_PHOTO, MAX_LIKES_ON_PHOTO),
    comments: Array.from({length: getRandomNumber(1, MAX_COMMENTARIES_ON_PHOTO)}, createComment),
  }
}


const objects = Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhotoDescription);
