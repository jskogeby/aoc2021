import { read } from './utils/read.js';

const format = (inp) =>
  inp.split('\n').map((row) =>
    row
      .split(' -> ')
      .map((pair) => pair.split(',').map(Number))
      .map((pair) => ({ x: Number(pair[0]), y: Number(pair[1]) }))
  );

const input = format(read(5));

// Part 1

const countIntersections = (lines) => {
  const maxX = Math.max(...lines.map((line) => [line[0].x, line[1].x]).flat());
  const maxY = Math.max(...lines.map((line) => [line[0].y, line[1].y]).flat());

  const m = [];
  for (let i = 0; i <= maxX + 1; i++) m[i] = Array(maxY + 1).fill(0);

  for (const line of lines) {
    const { x: x0, y: y0 } = line[0];
    const { x: x1, y: y1 } = line[1];
    if (x0 === x1) {
      const [a, b] = [Math.min(y0, y1), Math.max(y0, y1)];
      for (let i = a; i <= b; i++) {
        m[x0][i] += 1;
      }
    } else if (y0 === y1) {
      const [a, b] = [Math.min(x0, x1), Math.max(x0, x1)];
      for (let i = a; i <= b; i++) {
        m[i][y0] += 1;
      }
    } else {
      const [a, b] = x0 < x1 ? [line[0], line[1]] : [line[1], line[0]];
      if (a.y < b.y) {
        for (let i = 0; i <= b.x - a.x; i++) {
          m[a.x + i][a.y + i] += 1;
        }
      } else {
        for (let i = 0; i <= b.x - a.x; i++) {
          m[a.x + i][a.y - i] += 1;
        }
      }
    }
  }
  return m.flat().filter((val) => val > 1).length;
};

const first = () => {
  const lines = input.filter(
    (line) => line[0].x === line[1].x || line[0].y === line[1].y
  );
  return countIntersections(lines);
};

// Part 2

const second = () => {
  const lines = input;
  return countIntersections(lines);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
