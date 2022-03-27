import { openModal, closeModal } from './big_picture.js';
import { isEscEvent } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalClose = uploadModal.querySelector('#upload-cancel');
const uploadImage = uploadModal.querySelector('.img-upload__preview img');
const scaleControlValue = uploadModal.querySelector('.scale__control--value');
const defaultEffect = uploadModal.querySelector('#effect-none');
const sliderFieldset = uploadModal.querySelector('.img-upload__effect-level');


// Закрытие окна клавишей Esc
const onModalEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

// Открыть модальное окно загрузки файла
const openUploadModal = () => {
  uploadImage.classList.add('effects__preview--none');
  uploadImage.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  uploadImage.style.filter = '';
  sliderFieldset.classList.add('hidden');
  defaultEffect.checked = true;
  document.addEventListener('keydown', onModalEscKeyDown);
  openModal(uploadModal);
}

// Закрыть модальное окно загрузки файла
const closeUploadModal = () => {
  closeModal(uploadModal);
  document.removeEventListener('keydown', onModalEscKeyDown);
  uploadFile.value = '';
  uploadImage.classList.remove(uploadImage.className);
}

uploadFile.addEventListener('change', openUploadModal);

uploadModalClose.addEventListener('click', closeUploadModal);

uploadModalClose.addEventListener('keydown', onModalEscKeyDown);

export { uploadModal, uploadImage, scaleControlValue, sliderFieldset, onModalEscKeyDown }
