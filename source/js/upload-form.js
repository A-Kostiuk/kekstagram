import { openModal, closeModal } from './big_picture.js';
import { isEscEvent, showAlert } from './util.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalClose = uploadModal.querySelector('#upload-cancel');
const uploadImage = uploadModal.querySelector('.img-upload__preview img');
const scaleControlValue = uploadModal.querySelector('.scale__control--value');
const defaultEffect = uploadModal.querySelector('#effect-none');
const sliderFieldset = uploadModal.querySelector('.img-upload__effect-level');
const commentInput = uploadModal.querySelector('.text__description');
const hashtagsInput = uploadModal.querySelector('.text__hashtags');


// Закрытие окна клавишей Esc
const onModalEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

// Сброс формы
const formReset = () => {
  uploadFile.value = '';
  scaleControlValue.value = '';
  commentInput.value = '';
  hashtagsInput.value = '';
  uploadImage.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  uploadImage.style.filter = '';
  defaultEffect.checked = true;
}

// Открыть модальное окно загрузки файла
const openUploadModal = () => {
  uploadImage.classList.add('effects__preview--none');
  sliderFieldset.classList.add('hidden');
  document.addEventListener('keydown', onModalEscKeyDown);

  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadImage.src = reader.result;
    })
    reader.readAsDataURL(file);
  }
  openModal(uploadModal);
}

// Закрыть модальное окно загрузки файла
const closeUploadModal = () => {
  closeModal(uploadModal);
  document.removeEventListener('keydown', onModalEscKeyDown);
  uploadImage.classList.remove(uploadImage.className);
  formReset();
}

uploadFile.addEventListener('change', openUploadModal);

uploadModalClose.addEventListener('click', closeUploadModal);

uploadModalClose.addEventListener('keydown', onModalEscKeyDown);

// Функция отправки формы
const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить фото. Попробуйте еще раз.'),
      new FormData(evt.target),
    )
  })
}

export { uploadModal, uploadImage, scaleControlValue, sliderFieldset, onModalEscKeyDown, closeUploadModal, uploadForm, setUploadFormSubmit, hashtagsInput, commentInput }
