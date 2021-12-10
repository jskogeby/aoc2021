import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(10)
  .split('\n')
  .map((line) => line.split(''));

// Part 1

const scores1 = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const pairing = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const checkCorrupted = (line) => {
  const expected = [];
  for (const char of line) {
    if (char in pairing) {
      expected.push(pairing[char]);
    } else {
      if (char !== expected.pop()) {
        return scores1[char];
      }
    }
  }
};

const first = () => {
  return input
    .map(checkCorrupted)
    .filter((hasScore) => hasScore)
    .reduce(sum);
};

// Part 2

const scores2 = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const checkIncomplete = (line) => {
  const expected = [];
  for (const char of line) {
    if (char in pairing) {
      expected.push(pairing[char]);
    } else {
      expected.pop();
    }
  }
  expected.reverse();
  let score = expected.reduce((acc, current) => acc * 5 + scores2[current], 0);
  return score;
};

const second = () => {
  const incompletes = input
    .map(checkCorrupted)
    .map((score, i) => (score ? undefined : i))
    .filter(Number.isInteger)
    .map((i) => input[i]);

  const sortedScores = incompletes.map(checkIncomplete).sort((a, b) => b - a);
  return sortedScores[Math.trunc(sortedScores.length / 2)];
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
