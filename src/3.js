import { readToList } from './utils/read.js';

const input = readToList(3, [String]).flat();

// Part 1

const getBin = (list, i) => list.reduce((acc, curr) => acc.concat(curr[i]), []);

const getSum = (acc, current) => {
  acc[Number(current)] += 1;
  return acc;
};

const getGamma = (list) => {
  const len = list[0].length;
  let transpose = [];
  for (let i = 0; i < len; i++) {
    transpose.push(getBin(list, i));
  }
  let gamma = '';
  transpose.forEach((t) => {
    const occurances = t.reduce(getSum, [0, 0]);
    gamma += occurances[0] > occurances[1] ? '0' : '1';
  });
  return gamma;
};

const getEpsilon = (gamma) => {
  let epsilon = '';
  for (let i = 0; i < gamma.length; i++) {
    epsilon += gamma[i] === '0' ? '1' : '0';
  }
  return epsilon;
};

const first = () => {
  const gamma = getGamma(input);
  const epsilon = getEpsilon(gamma);
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

// Part 2

const mostIncludes = (isGamma) => {
  let list = [...input];
  let gamma = getGamma(list);
  let epsilon = getEpsilon(gamma);
  let toInclude = isGamma ? gamma : epsilon;
  for (let i = 1; i < toInclude.length; i++) {
    const sub = toInclude.slice(0, i);
    list = list.filter((inp) => String(inp).slice(0, i) === sub);
    console.log(sub);
    gamma = getGamma(list);
    epsilon = epsilon.slice(0, i) + getEpsilon(gamma).slice(i);
    toInclude = isGamma ? gamma : epsilon;
    if (list.length === 1) return list[0];
  }
};

const second = () => {
  const oxygen = mostIncludes(true);
  const co2 = mostIncludes(false);

  return parseInt(oxygen, 2) * parseInt(co2, 2);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
