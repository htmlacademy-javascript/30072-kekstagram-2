export const body = document.querySelector('body');

export const getRandomInteger = (i, j) => {
  const lower = Math.ceil(Math.min(i, j));
  const upper = Math.floor(Math.max(i, j));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomElement = (minItem, items) => items[getRandomInteger(minItem, items.length - 1)];

export const getUniqueId = (usedIds, minId, maxId) => {
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

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};
