import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(8).split('\n');

// Part 1

const first = () => {
  return input
    .map((line) => line.split(' | ')[1].split(' '))
    .flat()
    .filter((output) => [2, 3, 4, 7].includes(output.length)).length;
};

// Part 2

const findLength = (inp, len) => {
  const result = inp.find((str) => str.length === len);
  remove(inp, result);
  return result;
};

const remove = (inp, e) => inp.splice(inp.indexOf(e), 1);

const solve = (inp) => {
  const legend = {
    1: findLength(inp, 2),
    4: findLength(inp, 4),
    7: findLength(inp, 3),
    8: findLength(inp, 7)
  };
  legend[9] = inp.find(
    (seq) =>
      seq.length === 6 &&
      Array(...legend[4]).every((char) => seq.includes(char))
  );
  remove(inp, legend[9]);
  legend[6] = inp.find(
    (seq) =>
      seq.length === 6 &&
      Array(...legend[7]).filter((char) => seq.includes(char)).length === 2
  );
  remove(inp, legend[6]);
  legend[3] = inp.find(
    (seq) =>
      seq.length === 5 &&
      Array(...legend[1]).every((char) => seq.includes(char))
  );
  remove(inp, legend[3]);
  legend[0] = inp.find((seq) =>
    Array(...legend[7]).every((char) => seq.includes(char))
  );
  remove(inp, legend[0]);
  const remove1from4 = Array(...legend[4]).filter(
    (char) => !legend[1].includes(char)
  );
  legend[5] = inp.find((seq) =>
    remove1from4.every((char) => seq.includes(char))
  );
  remove(inp, legend[5]);
  legend[2] = inp[0];

  const reverseMap = {};
  for (const key in legend) reverseMap[legend[key]] = key;
  return reverseMap;
};

const sort = (str) =>
  Array(...str)
    .sort()
    .join('');

const second = () => {
  const outputs = [];
  for (const line of input) {
    const [inp, out] = line
      .split(' | ')
      .map((side) => side.split(' ').map(sort));
    const legend = solve(inp);
    const output = out.map((seq) => legend[seq]).join('');
    outputs.push(Number(output));
  }
  return outputs.reduce(sum);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
