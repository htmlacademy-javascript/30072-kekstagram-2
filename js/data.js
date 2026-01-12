import { DESCRIPTIONS, NAMES, MESSAGES, CommentId, CommentAvatar, COMMENT_MESSAGE_MIN, COMMENT_NAME_MIN, PhotoId, PhotoNumber, PHOTO_DESCRIPTION_MIN, PhotoLike, PhotoComment, PHOTO_AMOUNT } from './constants.js';
import { getRandomInteger, getRandomElement, getUniqueId } from './utils.js';

export const createRandomComment = () => {
  const usedCommentIds = [];

  return {
    id: getUniqueId(usedCommentIds, CommentId.MIN, CommentId.MAX),
    avatar: `img/avatar-${getRandomInteger(CommentAvatar.MIN, CommentAvatar.MAX)}.svg`,
    message: getRandomElement(COMMENT_MESSAGE_MIN, MESSAGES),
    name: getRandomElement(COMMENT_NAME_MIN, NAMES),
  };
};

const usedPhotoIds = [];

export const createPhotoData = () => {
  const id = getUniqueId(usedPhotoIds, PhotoId.MIN, PhotoId.MAX);
  const url = `photos/${getRandomInteger(PhotoNumber.MIN, PhotoNumber.MAX)}.jpg`;
  const description = getRandomElement(PHOTO_DESCRIPTION_MIN, DESCRIPTIONS);
  const likes = getRandomInteger(PhotoLike.MIN, PhotoLike.MAX);
  const comments = Array.from({length: getRandomInteger(PhotoComment.MIN, PhotoComment.MAX)}, createRandomComment);

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments,
  };
};

export const generatePhotos = () => Array.from({length: PHOTO_AMOUNT}, createPhotoData);
