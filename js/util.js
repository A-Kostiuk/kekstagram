const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const stringCount = (string, length) => {
  return string.length <= length ? true : false;
};

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getRandomArrayElements = (elements, max = elements.length) => {
  if (max > elements.length) {
    return -1;
  }
  const arrayLength = getRandomNumber(1, max);
  return elements.sort(() => Math.random() - 0.5).slice(arrayLength * (-1));
};

const getUniqueRandomNumber = (min, max) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('No any numbers')
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  }
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const shuffle = (arr) => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// таймаут запроса
const DEBOUNCE_INTERVAL = 500

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

export { getRandomNumber, shuffle, debounce, stringCount, getRandomArrayElement, getRandomArrayElements, getUniqueRandomNumber, isEscEvent, showAlert };
