import { read } from './utils/read.js';

const input = read(25)
  .split('\n')
  .map((line) => line.split(''));

// Part 1

const equal = (prev, current) =>
  prev.every((row, i) => row.every((cell, j) => cell === current[i][j]));

const step = (inp) => {
  let copy = inp.map((row) => [...row]);
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[0].length; j++) {
      const nextJ = (j + 1) % inp[i].length;
      if (inp[i][j] === '>' && inp[i][nextJ] === '.') {
        copy[i][j] = '.';
        copy[i][nextJ] = '>';
      }
    }
  }
  inp = copy.map((row) => [...row]);
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[0].length; j++) {
      const nextI = (i + 1) % inp.length;
      if (inp[i][j] === 'v' && inp[nextI][j] === '.') {
        copy[i][j] = '.';
        copy[nextI][j] = 'v';
      }
    }
  }
  // console.log();
  // copy.forEach((row) => console.log(row.join('')));
  return copy;
};

const simulate = () => {
  let prev = input.map((row) => [...row]);
  let current = step(prev);
  let nSteps = 1;
  while (!equal(prev, current)) {
    prev = current;
    current = step(current);
    nSteps += 1;
    // console.log(nSteps);
  }
  return nSteps;
};

const first = () => {
  return simulate();
};

// Part 2

const second = () => {
  return 0;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
