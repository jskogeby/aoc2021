import { read } from './utils/read.js';

const input = read(24)
  .split('\n')
  .map((line) => line.split(' '));

// Part 1

const initMem = (inp) => ({
  w: 0,
  x: 0,
  y: 0,
  z: 0,
  inp: Array.from(inp).map(Number)
});

const doOp = (line, mem) => {
  const [op, ...args] = line;
  const [a, b] = args;
  switch (op) {
    case 'inp': {
      mem[a] = mem.inp.shift();
      break;
    }
    case 'add': {
      mem[a] += b in mem ? mem[b] : Number(b);
      break;
    }
    case 'mul': {
      mem[a] *= b in mem ? mem[b] : Number(b);
      break;
    }
    case 'div': {
      mem[a] = Math.trunc(mem[a] / (b in mem ? mem[b] : Number(b)));
      break;
    }
    case 'mod': {
      mem[a] = mem[a] % (b in mem ? mem[b] : Number(b));
      break;
    }
    case 'eql': {
      mem[a] = mem[a] === (b in mem ? mem[b] : Number(b)) ? 1 : 0;
      break;
    }
  }
};

const run = (lines, inp) => {
  const mem = initMem(inp);
  const copy = [...lines];
  let current = copy.shift();
  while (current) {
    doOp(current, mem);
    current = copy.shift();
  }
  return mem;
};

const decr = (num) => {
  if (num.length === 0) return num;
  if (num[num.length - 1] === '1')
    return decr(num.slice(0, num.length - 1)) + '9';
  return (
    num.slice(0, num.length - 1) + String(Number(num.slice(num.length - 1)) - 1)
  );
};

const decrTimes = (num, times) => {
  let copy = num;
  for (let i = 0; i < times; i++) copy = decr(copy);
  console.log(copy);
  return copy;
};

const findModel = (lines) => {
  let model = '99999999999999';
  // let model = '55555555555555';
  let zPrefix = '';
  while (model.length === 14) {
    const mem = run(lines, model);
    let zPrefixCurrent = String(mem.z).slice(0, 4);
    if (zPrefix !== zPrefixCurrent) console.log(mem.z);
    // if (zPrefix === '3803') console.log(model);
    zPrefix = zPrefixCurrent;
    if (mem.z === 0) break;
    model = decr(model);
  }
  console.log(model);
};

const first = () => {
  const lines = [...input];
  // decrTimes('99999999999999', 257131364);
  findModel(lines);
};

// Part 2

const second = () => {
  return 0;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
