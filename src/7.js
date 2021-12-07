import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(7).split(',').map(Number);

// Part 1

const constantFuel = (x, inp) => inp.map((i) => Math.abs(i - x)).reduce(sum);

const calculateWith = (fn) => {
  const a = Math.min(...input);
  const b = Math.max(...input);
  let result = Infinity;
  for (let i = a; i < b; i++) {
    const res = fn(i, input);
    if (res < result) result = res;
  }
  return result;
};

const first = () => {
  return calculateWith(constantFuel);
};

// Part 2

const triangularNum = (n) => (n * (n + 1)) / 2;

const linearFuel = (x, inp) =>
  inp.map((i) => triangularNum(Math.abs(i - x))).reduce(sum);

const second = () => {
  return calculateWith(linearFuel);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
