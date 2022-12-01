import { read } from './utils/read.js';

const input = read(19)
  .split('\n\n')
  .map((scanner) =>
    scanner
      .split('\n')
      .slice(1)
      .map((beacon) => beacon.split(',').map(Number))
  );

// Part 1

const deepCopy = (inp) => {
  if (typeof inp === 'number') return inp;
  return inp.map(deepCopy);
};

const getArrangements = () => {
  const arrangements = [];
  for (const dim of [0, 1, 2]) {
    for (const dim of [0, 1, 2]) {
      for (const rotation of [0, 1, 2, 3]) {
        arrangements.push([dim, rotation]);
      }
    }
  }

  return arrangements;
};

const normalize = (scanner, idx) => {
  const refBeacon = scanner[idx];
  const normalized = scanner.map((b) => [
    b[0] - refBeacon[0],
    b[1] - refBeacon[1],
    b[2] - refBeacon[2]
  ]);
  return normalized;
};

const rotate = (beacon, axis, rotation) => {
  const transformed = [...beacon];
  switch (rotation) {
    case 0: {
      transformed[(axis + 1) % 3] = beacon[(axis + 1) % 3];
      transformed[(axis + 2) % 3] = beacon[(axis + 2) % 3];
      break;
    }
    case 1: {
      transformed[(axis + 1) % 3] = beacon[(axis + 2) % 3];
      transformed[(axis + 2) % 3] = beacon[(axis + 1) % 3] * -1;
      break;
    }
    case 2: {
      transformed[(axis + 1) % 3] = beacon[(axis + 1) % 3] * -1;
      transformed[(axis + 2) % 3] = beacon[(axis + 2) % 3] * -1;
      break;
    }
    case 3: {
      transformed[(axis + 1) % 3] = beacon[(axis + 2) % 3] * -1;
      transformed[(axis + 2) % 3] = beacon[(axis + 1) % 3];
      break;
    }
    default:
      console.log('this should not happen');
  }

  return transformed;
};

const transformBeacon = (beacon, axis, rotation1, rotation2) => {
  const transformed = rotate(beacon, axis, rotation1);
  return rotate(transformed, axis + 1, rotation2);
};

const transformScanner = (scanner, rotation, axis, direction) =>
  scanner.map((beacon) => transformBeacon(beacon, rotation, axis, direction));

const countOverlaps = (s1, s2) => {
  let count = 0;
  for (const b1 of s1) {
    if (s2.some((b2) => b2.every((dim, i) => b1[i] === dim))) {
      count += 1;
      // if (!b1.every((val) => val === 0)) console.log(b1);
    }
  }
  return count;
};

const findScanner = (ref, scanner) => {
  for (let i = 0; i < ref.length; i++) {
    const s1 = normalize(ref, i);
    for (const arrangement of getArrangements()) {
      const scannerCentricS2 = transformScanner(scanner, ...arrangement);
      for (let j = 0; j < scanner.length; j++) {
        const s2 = normalize(scannerCentricS2, j);
        if (countOverlaps(s1, s2) >= 12) {
          const beacon = transformBeacon(scanner[j], ...arrangement);
          const location = ref[i].map((val, axis) => val - beacon[axis]);
          return {
            location,
            beacons: scannerCentricS2.map((b) =>
              b.map((val, axis) => location[axis] + val)
            )
          };
        }
      }
    }
  }
};

const stringify = (beacon) => beacon.join(',');

const toBeacon = (str) => str.split(',').map(Number);

const eq = (s1, s2) =>
  s1.every((b1, i) => b1.every((dim, j) => dim === s2[i][j]));

const first = () => {
  let inp = deepCopy(input);
  // console.log(findScanner(findScanner(inp[0], inp[1]).beacons, inp[4]));
  // return;
  const transformed = [inp.shift()];
  while (inp.length > 0) {
    console.log('inp length', inp.length);
    const current = inp.shift();
    let found = false;
    for (let i = 0; i < transformed.length; i++) {
      const result = findScanner(transformed[i], current);
      if (result) {
        transformed.push(result.beacons);
        found = true;
        break;
      }
    }
    if (!found) inp.push(current);
  }
  // console.log(unique);
  const unique = new Set(transformed.flat().map(stringify));
  return unique.size;
};

// Part 2

const second = () => {
  return 0;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
