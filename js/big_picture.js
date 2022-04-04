import { isEscEvent } from './util.js';

const STACK_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const body = document.querySelector('body');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');


const onModalEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openModal = (element) => {
  element.classList.remove('hidden');
  body.classList.add('modal-open');
}

const closeModal = (element) => {
  element.classList.add('hidden');
  body.classList.remove('modal-open');
}

const closeBigPicture = () => {
  closeModal(bigPicture);
  bigPictureClose.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onModalEscKeyDown);
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
}

// Создаю коментарии
const createComment = (comment) => {
  const commentItem = commentTemplate.cloneNode(true);
  const picture = commentItem.querySelector('.social__picture');
  picture.src = comment.avatar;
  picture.alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
}

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  })
  commentsList.appendChild(commentsFragment)
}

// Функция вывода боьшой картинки
const show = (picture) => {
  let countStackComments = 1;
  const currentCommentsCount = bigPicture.querySelector('.current-comments-count');
  const numberOfComments = picture.comments.length;

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = numberOfComments;
  currentCommentsCount.textContent = numberOfComments > STACK_COMMENTS ? STACK_COMMENTS : numberOfComments;

  bigPictureClose.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onModalEscKeyDown);
  renderComments(picture.comments.slice(0, STACK_COMMENTS));
  openModal(bigPicture);

  // Функция загрузки комментариев
  const onCommentsLoaderClick = () => {
    countStackComments ++;
    const currentCommentsStack = STACK_COMMENTS * countStackComments;
    commentsList.innerHTML = '';
    currentCommentsCount.textContent = numberOfComments < currentCommentsStack ? numberOfComments : currentCommentsStack;
    renderComments(picture.comments.slice(0, currentCommentsStack));
    if (numberOfComments < currentCommentsStack) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.addEventListener('click', onCommentsLoaderClick, { once: true });
    }
  }
  if (numberOfComments <= STACK_COMMENTS) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.addEventListener('click', onCommentsLoaderClick, { once: true });
  }
}

export { show, openModal, closeModal }
