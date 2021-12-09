import { product, sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(9)
  .split('\n')
  .map((row) => row.split('').map(Number));

// Part 1

const isLow = (inp, i, j) =>
  (i - 1 < 0 || inp[i - 1][j] > inp[i][j]) &&
  (i + 1 >= inp.length || inp[i + 1][j] > inp[i][j]) &&
  (j - 1 < 0 || inp[i][j - 1] > inp[i][j]) &&
  (j + 1 >= inp[0].length || inp[i][j + 1] > inp[i][j]);

const findLows = (inp) => {
  const lows = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (isLow(input, i, j)) lows.push({ x: i, y: j });
    }
  }
  return lows;
};

const first = () => {
  const lows = findLows();
  return lows.map((low) => input[low.x][low.y]).reduce(sum) + lows.length;
};

// Part 2

const calcBasin = (inp, points) => {
  const pointsSet = new Set(points);
  for (const json of points) {
    const { x, y } = JSON.parse(json);
    if (
      x - 1 >= 0 &&
      !pointsSet.has(JSON.stringify({ x: x - 1, y })) &&
      inp[x - 1][y] !== 9
    )
      calcBasin(inp, pointsSet.add(JSON.stringify({ x: x - 1, y }))).forEach(
        (basin) => pointsSet.add(basin)
      );
    if (
      x + 1 < inp.length &&
      !pointsSet.has(JSON.stringify({ x: x + 1, y })) &&
      inp[x + 1][y] !== 9
    )
      calcBasin(inp, pointsSet.add(JSON.stringify({ x: x + 1, y }))).forEach(
        (basin) => pointsSet.add(basin)
      );
    if (
      y - 1 >= 0 &&
      !pointsSet.has(JSON.stringify({ x, y: y - 1 })) &&
      inp[x][y - 1] !== 9
    )
      calcBasin(inp, pointsSet.add(JSON.stringify({ x, y: y - 1 }))).forEach(
        (basin) => pointsSet.add(basin)
      );
    if (
      y + 1 < inp[0].length &&
      !pointsSet.has(JSON.stringify({ x, y: y + 1 })) &&
      inp[x][y + 1] !== 9
    )
      calcBasin(inp, pointsSet.add(JSON.stringify({ x, y: y + 1 }))).forEach(
        (basin) => pointsSet.add(basin)
      );
  }
  return pointsSet;
};

const second = () => {
  const lows = findLows();
  const basins = lows
    .map((low) => calcBasin(input, new Set([JSON.stringify(low)])))
    .sort((a, b) => b.size - a.size);

  return basins
    .slice(0, 3)
    .map((b) => b.size)
    .reduce(product);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
