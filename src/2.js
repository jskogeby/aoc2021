import { readToList } from './utils/read.js';

const input = readToList(2, [String, Number]);

// Part 1

const first = () => {
  const initial = { forward: 0, down: 0, up: 0 };
  const sum = input.reduce((acc, current) => {
    acc[current[0]] += current[1];
    return acc;
  }, initial);
  return sum.forward * (sum.down - sum.up);
};

// Part 2

const step = (acc, current) => {
  const [move, num] = current;
  if (move === 'forward')
    return { ...acc, x: acc.x + num, y: acc.y + num * acc.aim };
  if (move === 'down') return { ...acc, aim: acc.aim + num };
  if (move === 'up') return { ...acc, aim: acc.aim - num };
};

const second = () => {
  const initial = { x: 0, y: 0, aim: 0 };
  const result = input.reduce(step, initial);
  return result.x * result.y;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
