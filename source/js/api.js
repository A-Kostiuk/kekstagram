const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((responce) => responce.json())
    .then((photos) => {
      onSuccess(photos)
    });
}

const sendData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    })
    .then((responce) => {
      if (responce.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить фото. Попробуйте еще раз.')
      }
    })
    .catch(() => { onFail('Не удалось отправить фото. Попробуйте еще раз.')
    })
}


export { getData, sendData }
