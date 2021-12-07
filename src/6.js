import { read } from './utils/read.js';

const input = read(6).split(',').map(Number);

// Part 1

const afterDays = (days) => {
  let population = Array(9).fill(0);
  input.forEach((f) => (population[f] += 1));
  for (let i = 0; i < days; i++) {
    const nextPopulation = population.map((day, i) => {
      if (i === 8) return population[0];
      if (i === 6) return population[0] + population[7];
      return population[i + 1];
    });
    population = [...nextPopulation];
  }
  return population.reduce((a, b) => a + b);
};

const first = () => {
  return afterDays(80);
};

// Part 2

const second = () => {
  return afterDays(256);
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
