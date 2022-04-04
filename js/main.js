import { renderPhotos } from './preview.js';
import { setUploadFormSubmit } from './upload-form.js';
import { closeUploadModal } from './upload-form.js';

import './scaling.js';
import './effects.js';
import './form-validate.js';
import { getData } from './api.js'
import { shuffle, debounce } from './util.js'

const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;
let photos = [];

const imageFlters = document.querySelector('.img-filters');

const FilterSettings = {
  'filter-default': function () {
    renderPhotos(photos.slice(0, DEFAULT_PREVIEW_LOAD))
  },
  'filter-random': function () {
    renderPhotos(shuffle(photos.slice()).slice(0, RANDOM_PREVIEW_LOAD))
  },
  'filter-discussed': function () {
    renderPhotos(photos.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }))
  },
}

const removePictures = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures) {
    pictures.forEach((picture) => {
      picture.remove();
    })
  }
}

getData((data) => {
  photos = data.slice();
  FilterSettings['filter-default']();
  imageFlters.classList.remove('img-filters--inactive');
})

setUploadFormSubmit(closeUploadModal)

const onFilterClick = debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const buttons = imageFlters.querySelectorAll('.img-filters__button');
    buttons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    })
    removePictures();
    FilterSettings[evt.target.id]();
    evt.target.classList.add('img-filters__button--active');
  }
})

imageFlters.addEventListener('click', onFilterClick)
