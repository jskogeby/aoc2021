import { read } from './utils/read.js';

const [input1, input2] = read(13).split('\n\n');
const coords = input1
  .split('\n')
  .map((line) => line.split(','))
  .map((dot) => ({ x: Number(dot[0]), y: Number(dot[1]) }));
const folds = input2.split('\n').map((line) => {
  const splitLine = line.split('=');
  const axis = splitLine[0][splitLine[0].length - 1];
  const value = Number(splitLine[1]);
  return [axis, value];
});

// Part 1

const makeMatrix = (inp) => {
  const maxX = Math.max(...inp.map((coord) => coord.x));
  const maxY = Math.max(...inp.map((coord) => coord.y));
  const matrix = [];
  for (let i = 0; i <= maxY; i++) matrix.push(Array(maxX + 1).fill(0));
  for (const { x, y } of inp) matrix[y][x] += 1;
  return matrix;
};

const fold = (inp, axisVal) => {
  const [axis, val] = axisVal;
  const newDots = inp.filter((dot) => dot[axis] < val);
  const toFold = inp.filter((dot) => dot[axis] > val);
  for (const dot of toFold) {
    const target = dot[axis];
    const newPos = target - 2 * Math.abs(val - target);
    newDots.push({ ...dot, [axis]: newPos });
  }
  return newDots;
};

const print = (inp) => {
  const matrix = makeMatrix(inp);
  for (let i = 0; i < matrix.length; i++) {
    let row = '';
    for (let j = 0; j < matrix[0].length; j++) {
      row += matrix[i][j] ? '#' : '-';
    }
    console.log(row);
  }
};

const first = () => {
  const afterFold = fold(coords, folds[0]);
  return new Set(afterFold.map((dot) => Object.values(dot).join(','))).size;
};

// Part 2

const second = () => {
  let inp = coords;
  for (const f of folds) {
    inp = fold(inp, f);
  }
  print(inp);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ');
second();
