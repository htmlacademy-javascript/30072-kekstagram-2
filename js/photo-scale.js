const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

export const updateImageScale = (direction) => {
  const purifiedCurrentValue = parseInt(scaleInput.value, 10);
  if (direction === 'up' && purifiedCurrentValue < Scale.MAX) {
    scaleInput.value = `${purifiedCurrentValue + Scale.STEP}%`;
    previewImage.style.scale = (purifiedCurrentValue + Scale.STEP) / 100;
  }
  if (direction === 'down' && purifiedCurrentValue > Scale.MIN) {
    scaleInput.value = `${purifiedCurrentValue - Scale.STEP}%`;
    previewImage.style.scale = (purifiedCurrentValue - Scale.STEP) / 100;
  }
};

export function onScaleDownButtonClick (evt) {
  evt.preventDefault();
  updateImageScale('down');
}

export function onScaleUpButtonClick (evt) {
  evt.preventDefault();
  updateImageScale('up');
}
