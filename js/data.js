import { getRandomNumber, getRandomArrayElement, getUniqueRandomNumber } from './util.js';

const PHOTO_COUNT = 25;

const NumberOfComments = {
  MIN: 1,
  MAX: 5,
}

const NumberOfLikes = {
  MIN: 15,
  MAX: 200,
}

const Id = {
  MIN: 0,
  MAX: 999,
}

const PhotoNumber = {
  MIN: 1,
  MAX: 25,
}

const Names = [
  'Дима',
  'Тимофей',
  'Алексей',
  'Мария',
  'Кристина',
  'Вика',
  'Игорь',
  'Виктор',
  'Катя',
  'Денис',
];

const DescriptionsPhoto = [
  'Без фильтров',
  'Новая камера',
  'Зацените фотку!',
  'Хороший ракурс',
  'Просто так',
  'Из архива',
];

const Messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const photos = [];

const getUniqueRandomId = getUniqueRandomNumber(Id.MIN, Id.MAX);
const getUniqueRandomPhoto = getUniqueRandomNumber(PhotoNumber.MIN, PhotoNumber.MAX);

const createComment = () => {
  return {
    id: getUniqueRandomId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(Messages),
    name: getRandomArrayElement(Names),
  }
}

const addComments = () => {
  const comments = [];
  const count = getRandomNumber(NumberOfComments.MIN, NumberOfComments.MAX);
  for (let i = 0; count > i; i++) {
    comments.push(createComment());
  }
  return comments;
}

const createObject = (count) => {
  return {
    id: count,
    url: `photos/${getUniqueRandomPhoto()}.jpg`,
    description: getRandomArrayElement(DescriptionsPhoto),
    likes: getRandomNumber(NumberOfLikes.MIN, NumberOfLikes.MAX),
    comments: addComments(),
  }
}

const addOjects = () => {
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photos.push(createObject(i));
  }
}
addOjects()

export { photos }
