const Effect = {
  NONE: 'none',
  CHROME : 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const EffectConfig = {
  [Effect.NONE]: {
    range: {
      min: 0,
      max: 100
    },
    start: 0,
  },
  [Effect.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

export const getEffectFilter = (effect, value) => {
  switch (effect) {
    case Effect.CHROME:
      return `grayscale(${value})`;
    case Effect.SEPIA:
      return `sepia(${value})`;
    case Effect.MARVIN:
      return `invert(${value}%)`;
    case Effect.PHOBOS:
      return `blur(${value}px)`;
    case Effect.HEAT:
      return `brightness(${value})`;
    default:
      return null;
  }
};

export const getEffectOptions = (effect = Effect.NONE) => EffectConfig[effect];
