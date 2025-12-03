const descriptions = [
  'Описание 1',
  'Описание 2 другое',
  'Описание 3 еще какое-то',
  'Описание 4 обычное',
  'Описание 5 последнее',
];

const names = [
  'Иван',
  'Маша',
  'Стас',
  'Ольга',
  'Кекс',
];

const originalMessage = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

const getRandomInteger = (i, j) => {
  const lower = Math.ceil(Math.min(i, j));
  const upper = Math.floor(Math.max(i, j));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomMessage(text, count) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  const trimSentences = sentences.map((s) => s.trim());
  const shuffledSentences = trimSentences.sort(() => 0.5 - Math.random());

  return shuffledSentences.slice(0, count).join(' ');
}

function getUniqueId(usedIds, minId, maxId) {
  if (usedIds.length >= (maxId - minId + 1)) {
    return [];
  }

  let uniqueId;

  do {
    uniqueId = getRandomInteger(minId, maxId);
  } while (usedIds.includes(uniqueId));

  usedIds.push(uniqueId);

  return uniqueId;
}

const createRandomComment = () => {
  const randomMessage = getRandomMessage(originalMessage, getRandomInteger(1, 2));
  const usedCommentIds = [];

  return {
    id: getUniqueId(usedCommentIds, 0, 1000),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: randomMessage,
    name: names[getRandomInteger(0, names.length - 1)],
  };
};

const usedPhotoIds = [];

const createPhotoDataObject = () => {
  const id = getUniqueId(usedPhotoIds, 1, 25);
  const url = `photos/${getRandomInteger(1, 25)}.jpg`;
  const description = descriptions[getRandomInteger(0, descriptions.length - 1)];
  const likes = getRandomInteger(15, 200);
  const comments = Array.from({length: getRandomInteger(0, 30)}, createRandomComment);

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments,
  };
};

Array.from({length: 25}, createPhotoDataObject);
