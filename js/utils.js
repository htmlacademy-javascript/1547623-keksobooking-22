function getRandomInteger(from, to) {
  if (to > from && from >= 0) {
    return Math.round(from - 0.5 + Math.random() * (to - from + 1));
  }

  throw new Error('Input data error');
}

function getRandomFloat(from, to, decimal = 5) {
  if (to > from && from >= 0) {
    return +(Math.random() * (to - from) + from).toFixed(decimal);
  }

  throw new Error('Input data error');
}

function getZeroFirst(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function fillArray(array, values) {
  const newArray = [];
  for (let i = 0; i < values; i++) {
    newArray.push(array[i]);
  }

  return newArray;
}

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

export { getRandomInteger, getRandomFloat, getZeroFirst, getRandomArrayElement, fillArray, declOfNum };
