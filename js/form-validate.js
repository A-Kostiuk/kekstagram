import { uploadModal, onModalEscKeyDown } from './upload-file.js'

const Hashtag = {
  MIN_LENGHT: 2,
  MAX_LENGHT: 20,
  MAX_COUNT: 5,
}

const commentInput = uploadModal.querySelector('.text__description');
const hashtagsInput = uploadModal.querySelector('.text__hashtags');

hashtagsInput.addEventListener('input', () => {

  const arrayHashtags = hashtagsInput.value.trim().toLowerCase().split(/\s+/);
  arrayHashtags.forEach(hashtag => {

    hashtagsInput.setCustomValidity('')

    if (hashtag[0] != '#') {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинаться из #')
    } else if (hashtag.length < Hashtag.MIN_LENGHT) {
      hashtagsInput.setCustomValidity('Хэш-тег не может состоять только из решетки')
    }

    if (hashtag.length > Hashtag.MAX_LENGHT) {
      hashtagsInput.setCustomValidity('Слишком длинный хэш-тег')
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

  });

  const isValidCharacters = arrayHashtags.some((item) => {
    const string = item.slice(1);
    const regexp = /[^\wа-яёіє]/;
    return string.match(regexp, 1);
  })

  if (isValidCharacters) {
    hashtagsInput.setCustomValidity('Хэш-теги должны состоять из букв и чисел и не могут содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.')
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

commentInput.addEventListener('ivalid', () => {
  if (commentInput.validity.tooLong) {
    commentInput.setCustomValidity('Максимальная длина комментария 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }
})
