import { product, sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(16);

// Part 1

const toBinList = (hex) => {
  const binString = parseInt(hex, 16).toString(2);
  const padded = '0'.repeat(4 - binString.length) + binString;
  return padded.split('');
};

const toDec = (binList) => parseInt(binList.join(''), 2);

const calculate = (type, values) => {
  switch (type) {
    case 0:
      return values.reduce(sum);
    case 1:
      return values.reduce(product);
    case 2:
      return Math.min(...values);
    case 3:
      return Math.max(...values);
    case 5:
      return values[0] > values[1];
    case 6:
      return values[0] < values[1];
    case 7:
      return values[0] === values[1];
  }
};

const readPacket = (packet, info) => {
  const version = toDec(packet.splice(0, 3));
  info.versionSum += version;
  const type = toDec(packet.splice(0, 3));
  if (type === 4) {
    const value = readLiteral(packet);
    return value;
  } else {
    const operatorMap = readOperator(packet);
    const values = [];
    while (operatorMap.remaining > 0) {
      const originalLength = packet.length;
      values.push(readPacket(packet, info));
      const currentLength = packet.length;
      operatorMap.remaining -= operatorMap.diff(originalLength - currentLength);
    }
    return calculate(type, values);
  }
};

const readOperator = (segment) => {
  const mode = segment.shift();
  if (mode === '0') {
    return {
      remaining: toDec(segment.splice(0, 15)),
      diff: (diff) => diff
    };
  } else {
    return {
      remaining: toDec(segment.splice(0, 11)),
      diff: (diff) => 1
    };
  }
};

const readLiteral = (segment) => {
  let binLiteral = '';
  let reading = true;
  while (reading) {
    reading = segment.shift() === '1';
    binLiteral += segment.splice(0, 4).join('');
  }
  return toDec(binLiteral.split(''));
};

const first = () => {
  let message = input.split('').flatMap(toBinList);
  let info = { versionSum: 0 };
  readPacket(message, info);
  return info.versionSum;
};

// Part 2

const second = () => {
  let message = input.split('').flatMap(toBinList);
  let info = { versionSum: 0 };
  const value = readPacket(message, info);
  return value;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
