const chromeOptions = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const sepiaOptions = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const marvinOptions = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const phobosOptions = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const heatOptions = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

export const chooseEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${value})`;
    case 'sepia':
      return `sepia(${value})`;
    case 'marvin':
      return `invert(${value}%)`;
    case 'phobos':
      return `blur(${value}px)`;
    case 'heat':
      return `brightness(${value})`;
    default:
      return null;
  }
};

export const chooseOption = (effect) => {
  switch (effect) {
    case 'chrome':
      return chromeOptions;
    case 'sepia':
      return sepiaOptions;
    case 'marvin':
      return marvinOptions;
    case 'phobos':
      return phobosOptions;
    case 'heat':
      return heatOptions;
    default:
      return {};
  }
};

