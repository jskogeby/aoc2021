import { sum } from './utils/math.js';
import { read } from './utils/read.js';

const input = read(22)
  .split('\n')
  .map((line) => {
    const [on, coords] = line.split(' ');
    const cuboid = coords.split(',').map((str) =>
      str
        .slice(str.indexOf('=') + 1)
        .split('..')
        .map(Number)
    );
    return [on === 'on' ? 1 : 0, ...cuboid];
  });

// Part 1

const first = () => {
  const inp = input.filter((step) =>
    step
      .slice(1)
      .flat()
      .every((val) => val >= -50 && val <= 50)
  );
  const cube = Array(100);
  for (let i = 0; i < 100; i++) {
    const square = Array(100);
    for (let j = 0; j < 100; j++) {
      const line = Array(100).fill(0);
      square[j] = line;
    }
    cube[i] = square;
  }
  for (const step of inp) {
    const [on, xs, ys, zs] = step;
    for (let x = xs[0]; x <= xs[1]; x++) {
      for (let y = ys[0]; y <= ys[1]; y++) {
        for (let z = zs[0]; z <= zs[1]; z++) {
          cube[x + 50][y + 50][z + 50] = on;
        }
      }
    }
  }
  const count = cube
    .map((square) => square.map((line) => line.reduce(sum)).reduce(sum))
    .reduce(sum);
  return count;
};

// Part 2

const getCorners = (c) => {
  const corners = [];
  for (const x of c.x) {
    for (const y of c.y) {
      for (const z of c.z) {
        corners.push([x, y, z]);
      }
    }
  }
  return corners;
};

const isInsideOf = (c, p) => {
  const { x, y, z } = c;
  return (
    x[0] <= p[0] &&
    x[1] >= p[0] &&
    y[0] <= p[1] &&
    y[1] >= p[1] &&
    z[0] <= p[2] &&
    z[1] >= p[2]
  );
};

const getMiddles = (c1, c2, dim) => {
  const list = c1[dim].concat(c2[dim]).sort((a, b) => a - b);
  return list.slice(1, 3);
};

const countCube = (cube) => {
  const { x, y, z } = cube;
  return (x[1] - x[0] + 1) * (y[1] - y[0] + 1) * (z[1] - z[0] + 1);
};

const intersectionOf = (c1, c2) => {
  const corners1 = getCorners(c1);
  const corners2 = getCorners(c2);
  if (
    corners1.some((corner) => isInsideOf(c2, corner)) ||
    corners2.some((corner) => isInsideOf(c1, corner))
  ) {
    const cube = {
      x: getMiddles(c1, c2, 'x'),
      y: getMiddles(c1, c2, 'y'),
      z: getMiddles(c1, c2, 'z'),
      on: 1
    };
    return { ...cube };
  }
};

const sumCount = (cuboids) =>
  cuboids.length === 0 ? 0 : cuboids.map(countCube).reduce(sum);

const serialize = (c) => {
  return `x${c.x.join(',')}y${c.y.join(',')}z${c.z.join(',')},${c.on}`;
};

const countCuboids = (cuboids) => {
  console.log(cuboids.length);
  if (cuboids.length === 0) return 0;
  if (cuboids.every((c) => serialize(c) === serialize(cuboids[0])))
    return countCube(cuboids[0]);
  const adds = [];
  const deletes = [];
  for (const cuboid of cuboids) {
    deletes.push(
      ...adds.map((c) => intersectionOf(cuboid, c)).filter((x) => x)
    );
    if (cuboid.on === 1) adds.push(cuboid);
  }
  return sumCount(adds) - countCuboids(deletes);
};

const second = () => {
  const inp = input.map((step) => {
    const [on, x, y, z] = step;
    return {
      x,
      y,
      z,
      on
    };
  });
  const c1 = {
    x: [0, 9],
    y: [0, 9],
    z: [0, 9],
    on: 1
  };
  const c2 = {
    x: [7, 16],
    y: [7, 16],
    z: [7, 16],
    on: 0
  };
  const c3 = {
    x: [8, 8],
    y: [8, 8],
    z: [8, 8],
    on: 0
  };
  return countCuboids([c1, c3, c2]);
  // return countCuboids(inp);
};

// Result

// console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
