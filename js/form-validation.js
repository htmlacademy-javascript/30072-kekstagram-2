const Hashtag = {
  MAX_AMOUNT: 5,
  MAX_LENGTH: 20,
};

const HashtagError = {
  UNIQUE: 'Все хештеги должны быть уникальными',
  AMOUNT: 'Превышено количество хештегов',
  MAX_LENGTH: `Хештег не должен превышать ${Hashtag.MAX_LENGTH} символов`,
  ONLY_HASH: 'Хештег не может состоять только из #',
  INVALID: 'Хештег невалидный',
};

const COMMENT_MAX_LENGTH = 140;
export const COMMENT_ERROR_MESSAGE = 'Длина комментария не должна быть больше 140 символов';

const checkHashtagsUnique = (hashtags) => {
  const uniqueHashtagsArray = new Set(hashtags);
  return uniqueHashtagsArray.size !== hashtags.length;
};

const checkHashtagsAmount = (hashtags) => hashtags.length > Hashtag.MAX_AMOUNT;

const checkHashtagLength = (hashtag) => hashtag.length > Hashtag.MAX_LENGTH;

const checkHashtagStartWith = (hashtag) => hashtag === '#';

const checkHashtagSymbols = (hashtag) => !(/^#[a-zа-яё0-9]+$/i.test(hashtag));

const getArrayFromInput = (element) => {
  const purifiedInputValue = element.value.trim().toLowerCase();
  return purifiedInputValue.split(/\s+/).filter(Boolean);
};

export const checkCommentValidity = (element) => element.value.length <= COMMENT_MAX_LENGTH;

export const getHashtagsErrorMessage = (element) => {
  const hashtagsArray = getArrayFromInput(element);

  if (checkHashtagsUnique(hashtagsArray)) {
    return HashtagError.UNIQUE;
  }
  if (checkHashtagsAmount(hashtagsArray)) {
    return HashtagError.AMOUNT;
  }

  for (const hashtag of hashtagsArray) {
    if (checkHashtagLength(hashtag)) {
      return HashtagError.MAX_LENGTH;

    }
    if (checkHashtagStartWith(hashtag)) {
      return HashtagError.ONLY_HASH;
    }
    if (checkHashtagSymbols(hashtag)) {
      return HashtagError.INVALID;
    }
  }
};

export const checkHashtagsValidity = (element) => {
  if (!element.value) {
    return true;
  }
  const hashtagsArray = getArrayFromInput(element);

  if (checkHashtagsUnique(hashtagsArray) || checkHashtagsAmount(hashtagsArray)) {
    return false;
  }

  return hashtagsArray.every((hashtag) => !(checkHashtagLength(hashtag) || checkHashtagStartWith(hashtag) || checkHashtagSymbols(hashtag)));
};
