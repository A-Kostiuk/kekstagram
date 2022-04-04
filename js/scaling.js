import { uploadModal, uploadImage, scaleControlValue } from './upload-form.js'

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
}

const scaleControlSmaller = uploadModal.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadModal.querySelector('.scale__control--bigger');

const scaleValue = () => {
  return scaleControlValue.value.replace(/[^0-9]/g, '');
}

const zoomIn = () => {
  if (scaleValue() < Scale.MAX) {
    scaleControlValue.value = `${+scaleValue() + Scale.STEP}%`;
    uploadImage.style.transform = `scale(${scaleValue()/100})`;
  }
}

const zoomOut = () => {
  if (scaleValue() > Scale.MIN) {
    scaleControlValue.value = `${+scaleValue() - Scale.STEP}%`;
    uploadImage.style.transform = `scale(${scaleValue()/100})`;
  }
}

scaleControlBigger.addEventListener('click', zoomIn);
scaleControlSmaller.addEventListener('click', zoomOut);
