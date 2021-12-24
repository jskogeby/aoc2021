import { read } from './utils/read.js';

const input = read(18)
  .split('\n')
  .map((line) => JSON.parse(line));

// Part 1

const incrementIdx = (idx, currIdx, incr, num, parentNum, parentIdx) => {
  if (typeof num === 'number') {
    if (currIdx + 1 === idx) {
      parentNum[parentIdx] += incr;
    }
    return currIdx + 1;
  }
  if (idx === 0 || currIdx >= idx + 1) return currIdx;
  const [left, right] = num;
  currIdx = incrementIdx(idx, currIdx, incr, left, num, 0);
  currIdx = incrementIdx(idx, currIdx, incr, right, num, 1);
  return currIdx;
};

const explode = (leftIdx, pair, num, parent, parentIdx) => {
  const [left, right] = pair;
  incrementIdx(leftIdx - 1, 0, left, num);
  incrementIdx(leftIdx + 2, 0, right, num);
  parent[parentIdx] = 0;
};

const reduceExplode = (num, root, depth, idx, parent, parentIdx) => {
  if (idx === -1) return -1;
  if (typeof num === 'number') return idx + 1;
  if (depth === 4) {
    explode(idx + 1, num, root, parent, parentIdx);
    return -1;
  }
  const [left, right] = num;
  idx = reduceExplode(left, root, depth + 1, idx, num, 0);
  idx = reduceExplode(right, root, depth + 1, idx, num, 1);
  return idx;
};

const reduceSplit = (num, root, depth, idx, parent, parentIdx) => {
  if (idx === -1) return -1;
  if (typeof num === 'number') {
    if (num > 9) {
      parent[parentIdx] = [Math.trunc(num / 2), Math.round(num / 2)];
      return -1;
    } else {
      return idx + 1;
    }
  }
  const [left, right] = num;
  idx = reduceSplit(left, root, depth + 1, idx, num, 0);
  idx = reduceSplit(right, root, depth + 1, idx, num, 1);
  return idx;
};

const reduce = (acc, curr) => {
  let num = [deepCopy(acc), deepCopy(curr)];
  let didSplit = true;
  while (didSplit) {
    let didExplode = reduceExplode(num, num, 0, 0) === -1;
    while (didExplode) {
      didExplode = reduceExplode(num, num, 0, 0) === -1;
    }
    didSplit = reduceSplit(num, num, 0, 0) === -1;
  }
  return num;
};

const magnitude = (num) => {
  if (typeof num === 'number') return num;
  const [left, right] = num;
  return 3 * magnitude(left) + 2 * magnitude(right);
};

const toString = (num) => {
  if (typeof num === 'number') return String(num);
  const [left, right] = num;
  return '[' + toString(left) + ',' + toString(right) + ']';
};

const deepCopy = (num) => {
  if (typeof num === 'number') return num;
  const [left, right] = num;
  return [deepCopy(left), deepCopy(right)];
};

const first = () => {
  let [firstNum, ...nums] = input.map(deepCopy);
  const result = nums.reduce(reduce, firstNum);
  return magnitude(result);
};

// Part 2

const second = () => {
  const nums = input.map(deepCopy);
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      const sum = magnitude(reduce(nums[i], nums[j]));
      if (sum > max) {
        max = sum;
      }
    }
  }
  return max;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
