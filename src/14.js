import { read } from './utils/read.js';

const setup = () => {
  const input = read(14).split('\n\n');
  const template = input[0];
  const legend = {};
  const pairOccs = {};
  const elOccs = {};
  input[1]
    .split('\n')
    .map((line) => line.split(' -> '))
    .forEach((pair) => {
      legend[pair[0]] = pair[1];
      pairOccs[pair[0]] = 0;
      const [e1, e2] = pair[0];
      elOccs[e1] = 0;
      elOccs[e2] = 0;
    });
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);
    pairOccs[pair] += 1;
    const [e1, e2] = pair;
    elOccs[e1] += 1;
    elOccs[e2] += 1;
  }
  return { legend, pairOccs, elOccs };
};

const iterate = (legend, pairOccs, elOccs) => {
  const copy = { ...pairOccs };
  for (const key in copy) copy[key] = 0;
  Object.entries(pairOccs)
    .filter((e) => e[1] > 0)
    .forEach((e) => {
      const [pair, occ] = e;
      const element = legend[pair];
      elOccs[element] += occ;

      const p1 = pair[0] + element;
      const p2 = element + pair[1];
      copy[p1] += occ;
      copy[p2] += occ;
    });
  return copy;
};

const iterateTimes = (times, legend, pairOccs, elOccs) => {
  let result = pairOccs;
  for (let i = 0; i < times; i++) {
    result = iterate(legend, result, elOccs);
  }
  return result;
};

const run = (times) => {
  const { legend, pairOccs, elOccs } = setup();
  iterateTimes(times, legend, pairOccs, elOccs);
  return (
    Math.max(...Object.values(elOccs)) - Math.min(...Object.values(elOccs))
  );
};

const first = () => run(10);

// Part 2

const second = () => run(40);

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
