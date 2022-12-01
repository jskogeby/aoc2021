import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const [input1, input2] = read(20).split('\n\n');
const algorithm = input1.split('');
const input = input2.split('\n').map((line) => line.split(''));

// Part 1

const pad = (x, inp) => {
  const copy = inp.map((row) => [...row]);
  for (let i = 0; i < x; i++) {
    const blankRow1 = Array(copy[0].length).fill('.');
    const blankRow2 = Array(copy[0].length).fill('.');
    copy.unshift(blankRow1);
    copy.push(blankRow2);
  }
  for (let i = 0; i < copy.length; i++) {
    const leftPad = Array(x).fill('.');
    const rightPad = Array(x).fill('.');
    copy[i].unshift(...leftPad);
    copy[i].push(...rightPad);
  }
  return copy;
};

const convolution = (inp, algo, x, y) => {
  let binString = '';
  for (let j = y - 1; j < y + 2; j++) {
    for (let i = x - 1; i < x + 2; i++) {
      binString += inp[j][i] === '#' ? '1' : '0';
    }
  }
  const binVal = parseInt(binString, 2);
  return algo[binVal];
};

const enhance = (inp, algo) => {
  const img = pad(0, inp);
  const output = [];
  for (let i = 1; i < img.length - 1; i++) {
    const row = [];
    for (let j = 1; j < img[0].length - 1; j++) {
      row.push(convolution(img, algo, j, i));
    }
    output.push(row);
  }

  return output;
};

const iterate = (times, inp, algo) => {
  let result = pad(
    times * 2 + 5,
    inp.map((row) => [...row])
  );
  for (let i = 0; i < times; i++) {
    result = enhance(result, algo);
  }
  return result;
};

const print = (inp) => {
  for (const row of inp) {
    console.log(row.join(''));
  }
};

const count = (inp) => {
  const binMap = inp.map((row) => row.map((val) => (val === '#' ? 1 : 0)));
  return binMap.map((row) => row.reduce(sum)).reduce(sum);
};

const run = (times) => {
  const inp = input.map((row) => [...row]);
  const output = iterate(times, inp, algorithm);
  // print(output);
  return count(output);
};

const first = () => run(2);

// Part 2

const second = () => run(50);

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
