import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(15)
  .split('\n')
  .map((line) => line.split('').map(Number));

// Part 1

const h = (inp, p) => {
  return inp.length - p.x + (inp[0].length - p.y);
};

const getNeighbours = (inp, p) => {
  const neighbors = [];
  if (p.x + 1 < inp.length) neighbors.push({ x: p.x + 1, y: p.y });
  if (p.x - 1 >= 0) neighbors.push({ x: p.x - 1, y: p.y });
  if (p.y + 1 < inp[0].length) neighbors.push({ x: p.x, y: p.y + 1 });
  if (p.y - 1 >= 0) neighbors.push({ x: p.x, y: p.y - 1 });
  return neighbors;
};

const makePath = (end, cameFrom) => {
  const path = [end];
  let current = cameFrom[end];
  while (current) {
    path.unshift(current);
    current = cameFrom[current];
  }
  return path;
};

const totalRisk = (inp, path) => {
  const cost = path
    .map((pKey) => {
      const { x, y } = parse(pKey);
      return inp[x][y];
    })
    .reduce(sum);
  return cost - inp[0][0];
};

const toString = (p) => `${p.x},${p.y}`;

const parse = (pKey) => {
  const [x, y] = pKey.split(',').map(Number);
  return { x, y };
};

const findPath = (inp) => {
  const cameFrom = {};
  const start = toString({ x: 0, y: 0 });
  const goal = toString({ x: inp.length - 1, y: inp[0].length - 1 });
  // Would run MUCH faster if fringe was a priority queue
  const fringe = [start];
  const gScore = { [start]: 0 };
  const fScore = { [start]: h(inp, parse(start)) };
  while (fringe.length !== 0) {
    fringe.sort(
      (a, b) =>
        (b in fScore ? fScore[b] : Infinity) -
        (a in fScore ? fScore[a] : Infinity)
    );
    const current = fringe.pop();
    if (current === goal) {
      return makePath(current, cameFrom);
    }
    const neighbours = getNeighbours(inp, parse(current));
    for (const n of neighbours) {
      const nKey = toString(n);
      const tempG = gScore[current] + inp[n.x][n.y];
      if (!(nKey in gScore) || tempG < gScore[nKey]) {
        gScore[nKey] = tempG;
        cameFrom[nKey] = current;
        fScore[nKey] = tempG + h(inp, n);
        if (!fringe.includes(nKey)) {
          fringe.push(nKey);
        }
      }
    }
  }
};

const first = () => {
  const inp = input.map((row) => [...row]);
  const path = findPath(inp);
  return totalRisk(inp, path);
};

// Part 2

const expandMap = (inp) => {
  const colMap = [];
  for (const row of inp) {
    const subRow = [];
    for (let i = 0; i < 5; i++) {
      subRow.push(...row.map((val) => ((val - 1 + i) % 9) + 1));
    }
    colMap.push(subRow);
  }
  const wholeMap = [];
  for (let i = 0; i < 5; i++) {
    const subMap = [];
    for (const row of colMap) {
      subMap.push(row.map((val, j) => ((val - 1 + i) % 9) + 1));
    }
    wholeMap.push(...subMap);
  }
  return wholeMap;
};

const second = () => {
  const inp = expandMap(input);
  const path = findPath(inp);
  return totalRisk(inp, path);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
