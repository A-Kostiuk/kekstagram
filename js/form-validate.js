import { commentInput, hashtagsInput, onModalEscKeyDown } from './upload-form.js';
import { stringCount } from './util.js';

const MAX_COMMENTLENGTH = 140;

const Hashtag = {
  MIN_LENGHT: 2,
  MAX_LENGHT: 20,
  MAX_COUNT: 5,
}

hashtagsInput.addEventListener('input', () => {

  const arrayHashtags = hashtagsInput.value.trim().toLowerCase().split(/\s+/);

  hashtagsInput.setCustomValidity('');

  const isHashFirst = arrayHashtags.some((item) => {
    return item[0] != '#';
  });
  const isMinHashtagLength = arrayHashtags.some((item) => {
    return item.length < Hashtag.MIN_LENGHT;
  })

  if (isHashFirst) {
    hashtagsInput.setCustomValidity('Хэш-тег должен начинаться из #');
  } else if (isMinHashtagLength) {
    hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из решетки');
  }

  const isMaxHashtagLength = arrayHashtags.some((item) => {
    return item.length > Hashtag.MAX_LENGHT;
  })
  if (isMaxHashtagLength) {
    hashtagsInput.setCustomValidity('Слишком длинный хэш-тег');
  }

  if (arrayHashtags.length > Hashtag.MAX_COUNT) {
    hashtagsInput.setCustomValidity(`Слишком много хэш-тегов, уберите ${arrayHashtags.length - Hashtag.MAX_COUNT}.`)
  }

  const isRepeatingHashtag = arrayHashtags.some((item, i, array) => {
    return array.indexOf(item, i + 1) >= i + 1;
  });

  if (isRepeatingHashtag) {
    hashtagsInput.setCustomValidity('Хэш-теги, не должны повторяться.')
  }

  const isValidCharacters = arrayHashtags.some((item) => {
    const string = item.slice(1);
    const regexp = /[^\wа-яёіє]/;
    return string.match(regexp);
  })

  if (isValidCharacters) {
    hashtagsInput.setCustomValidity('Хэш-теги должны состоять из букв и чисел и не могут содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
  }
  hashtagsInput.reportValidity();
})

hashtagsInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onModalEscKeyDown);
})

hashtagsInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onModalEscKeyDown);
})

commentInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onModalEscKeyDown);
})

commentInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onModalEscKeyDown);
})

commentInput.addEventListener('input', () => {
  if (stringCount(commentInput.value, MAX_COMMENTLENGTH)) {
    commentInput.setCustomValidity('Максимальная длина комментария 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }
})

export { commentInput, hashtagsInput}
