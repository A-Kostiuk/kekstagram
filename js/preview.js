import { show } from './big_picture.js'

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhoto = (photo) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    show(photo);
  })
  return photoElement;
}

const renderPhotos = (photos) => {
  const photosListFargment = document.createDocumentFragment();
  photos.forEach((photo) => {
    photosListFargment.appendChild(createPhoto(photo));
  });
  picturesContainer.appendChild(photosListFargment);
};

export { renderPhotos };
