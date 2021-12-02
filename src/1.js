import { numList, read } from './utils/read.js';

const input = numList(read(1));

// Part 1

const first = () =>
  input.reduce(
    (acc, current, i) => (current > input[i - 1] ? acc + 1 : acc),
    0
  );

// Part 2

const sum = (a, b) => a + b;

const reduceToSum = (i) => input.slice(i, i + 3).reduce(sum, 0);

const second = () => {
  return input.reduce(
    (acc, _, i) => (reduceToSum(i + 1) > reduceToSum(i) ? acc + 1 : acc),
    0
  );
};

// Result

console.log(first());
console.log(second());
