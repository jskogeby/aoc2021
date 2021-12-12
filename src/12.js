import { read } from './utils/read.js';

const input = read(12)
  .split('\n')
  .map((line) => line.split('-'));

// Part 1

const isSmall = (cave) => cave === cave.toLowerCase();

const pruneSmall = (path) => {
  const head = path[path.length - 1];
  return isSmall(head) ? [head] : [];
};

const buildMap = (inp) => {
  const map = {};
  for (const [a, b] of inp) {
    if (b !== 'start') {
      if (a in map) {
        map[a].push(b);
      } else {
        map[a] = [b];
      }
    }
    if (a !== 'start') {
      if (b in map) {
        map[b].push(a);
      } else {
        map[b] = [a];
      }
    }
  }
  return map;
};

const prunedMap = (map, pruneList) => {
  const newMap = {};
  for (const [key, val] of Object.entries(map)) {
    newMap[key] = val.filter((cave) => !pruneList.includes(cave));
  }
  return newMap;
};

const findPaths = (map, path, finalPaths, pruneFn) => {
  const head = path[path.length - 1];
  if (head === 'end') {
    finalPaths.push(path);
    return;
  }
  const pruneList = pruneFn(path);
  const newMap = prunedMap(map, pruneList);
  const neighbours = newMap[head];
  for (const n of neighbours) {
    findPaths(newMap, [...path, n], finalPaths, pruneFn);
  }
};

const countPathsWith = (pruneFn) => {
  const inp = input.map((line) => [...line]);
  const map = buildMap(inp);
  const paths = [];
  findPaths(map, ['start'], paths, pruneFn);
  return paths.length;
};

const first = () => countPathsWith(pruneSmall);

// Part 2

const shouldPrune = (path) => {
  const head = path[path.length - 1];
  const smallVisited = path.filter(isSmall);
  return isSmall(head) && smallVisited.length - new Set(smallVisited).size > 0
    ? smallVisited
    : [];
};

const second = () => countPathsWith(shouldPrune);

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
