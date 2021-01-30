'use strict';

function getRandomInteger(from, to) {
  if (to > from && from >= 0) {
    const result = Math.round(Math.random() * to);
    return result >= from ? result : getRandomInteger(from, to);
  }

  throw new Error('Input data error');
}

function getRandomFloat(from, to, decimal = 2) {
  if (to > from && from >= 0) {
    const result = (Math.random() * to).toFixed(decimal);
    return result >= from ? result : getRandomFloat(from, to, decimal);
  }

  throw new Error('Input data error');
}

getRandomInteger(0, 5);
getRandomFloat(0, 10);
