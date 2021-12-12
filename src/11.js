import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(11)
  .split('\n')
  .map((line) => line.split('').map(Number));

// Part 1

const isWithin = (inp, x, y) =>
  x >= 0 && x < inp.length && y >= 0 && y < inp[0].length;

const flash = (inp, x, y) => {
  for (let i = x - 1; i < x + 2; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      if ((i !== x || j !== y) && isWithin(inp, i, j)) {
        inp[i][j] += 1;
      }
    }
  }
};

const checkFlashes = (inp, alreadyFlashed) => {
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[0].length; j++) {
      const octopus = `${i},${j}`;
      if (inp[i][j] > 9 && !alreadyFlashed.includes(octopus)) {
        flash(inp, i, j);
        alreadyFlashed.push(octopus);
      }
    }
  }
  return alreadyFlashed;
};

const step = (inp) => {
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[0].length; j++) {
      inp[i][j] += 1;
    }
  }
  const flashed = [];
  let prevFlashed = 0;
  do {
    prevFlashed = flashed.length;
    flashed.concat(checkFlashes(inp, flashed));
  } while (prevFlashed !== flashed.length);

  for (const f of flashed) {
    const [x, y] = f.split(',');
    inp[x][y] = 0;
  }
  return flashed.length;
};

const first = () => {
  const inp = input.map((row) => [...row]);
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    flashes += step(inp);
  }
  return flashes;
};

// Part 2

const second = () => {
  const inp = input.map((row) => [...row]);
  const nOctopus = inp.map((row) => row.length).reduce(sum);
  let nStep = 1;
  while (step(inp) !== nOctopus) nStep += 1;
  return nStep;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
