import { uploadImage, uploadModal, sliderFieldset, uploadForm } from './upload-form.js';

const Effects = {
  chrome: {
    FILTERNAME: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
  },
  sepia: {
    FILTERNAME: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
  },
  marvin: {
    FILTERNAME: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNITS: '%',
  },
  phobos: {
    FILTERNAME: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    UNITS: 'px',
  },
  heat: {
    FILTERNAME: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
  },
}

const sliderElement = uploadModal.querySelector('.effect-level__slider');
const sliderValue = uploadModal.querySelector('.effect-level__value');

const uploadImageStyleFilter = (filterName, value, units) => {
  units != undefined ? units : units = '';
  uploadImage.style.filter = `${filterName}(${value + units})`;
}

const effectsChangeHandler = (evt) => {
  const currentValue = evt.target.value;
  if (evt.target.matches('input.effects__radio')) {
    uploadImage.classList.remove(uploadImage.className);
    uploadImage.classList.add(`effects__preview--${currentValue}`);
    if (evt.target.value === 'none') {
      sliderFieldset.classList.add('hidden');
      uploadImage.style.filter = '';
    } else {
      uploadImageStyleFilter(Effects[currentValue].FILTERNAME, Effects[currentValue].MAX, Effects[currentValue].UNITS);
      sliderFieldset.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: Effects[currentValue].MIN,
          max: Effects[currentValue].MAX,
        },
        start: Effects[currentValue].MAX,
        step: Effects[currentValue].STEP,
      })
    }
  }
}

uploadForm.addEventListener('change', effectsChangeHandler)

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => {
        return parseFloat(value);
      },
    },
  })
}
createSlider();

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  const currentValue = uploadImage.className.replace('effects__preview--', '');
  if (currentValue) {
    sliderValue.value = (unencoded[handle]);
    uploadImageStyleFilter(Effects[currentValue].FILTERNAME, unencoded[handle], Effects[currentValue].UNITS);
  }
})
