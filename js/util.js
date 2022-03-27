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
      throw new Error ('No any numbers')
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

export { getRandomNumber, stringCount, getRandomArrayElement, getRandomArrayElements, getUniqueRandomNumber, isEscEvent };
