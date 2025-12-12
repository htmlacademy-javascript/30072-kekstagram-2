const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2 другое',
  'Описание 3 еще какое-то',
  'Описание 4 обычное',
  'Описание 5 последнее',
];

const NAMES = [
  'Иван',
  'Маша',
  'Стас',
  'Ольга',
  'Кекс',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const CommentId = {
  MIN: 0,
  MAX: 1000,
};

const CommentAvatar = {
  MIN: 1,
  MAX: 6,
};

const CommentMessage = {
  MIN: 0,
  MAX: MESSAGES.length - 1,
};

const CommentName = {
  MIN: 0,
  MAX: NAMES.length - 1,
};

const PhotoId = {
  MIN: 1,
  MAX: 25,
};

const PhotoNumber = {
  MIN: 1,
  MAX: 25,
};

const PhotoDescription = {
  MIN: 0,
  MAX: DESCRIPTIONS.length - 1,
};

const PhotoLikes = {
  MIN: 15,
  MAX: 200,
};

const PhotoComments = {
  MIN: 0,
  MAX: 30,
};

const getRandomInteger = (i, j) => {
  const lower = Math.ceil(Math.min(i, j));
  const upper = Math.floor(Math.max(i, j));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueId = (usedIds, minId, maxId) => {
  if (usedIds.length >= (maxId - minId + 1)) {
    return [];
  }

  let uniqueId;

  do {
    uniqueId = getRandomInteger(minId, maxId);
  } while (usedIds.includes(uniqueId));

  usedIds.push(uniqueId);

  return uniqueId;
};

const createRandomComment = () => {
  const usedCommentIds = [];

  return {
    id: getUniqueId(usedCommentIds, CommentId.MIN, CommentId.MAX),
    avatar: `img/avatar-${getRandomInteger(CommentAvatar.MIN, CommentAvatar.MAX)}.svg`,
    message: MESSAGES[getRandomInteger(CommentMessage.MIN, CommentMessage.MAX)],
    name: NAMES[getRandomInteger(CommentName.MIN, CommentName.MAX)],
  };
};

const usedPhotoIds = [];

const createPhotoData = () => {
  const id = getUniqueId(usedPhotoIds, PhotoId.MIN, PhotoId.MAX);
  const url = `photos/${getRandomInteger(PhotoNumber.MIN, PhotoNumber.MAX)}.jpg`;
  const description = DESCRIPTIONS[getRandomInteger(PhotoDescription.MIN, PhotoDescription.MAX)];
  const likes = getRandomInteger(PhotoLikes.MIN, PhotoLikes.MAX);
  const comments = Array.from({length: getRandomInteger(PhotoComments.MIN, PhotoComments.MAX)}, createRandomComment);

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments,
  };
};

Array.from({length: 25}, createPhotoData);
