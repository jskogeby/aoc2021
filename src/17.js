const [lowerX, upperX] = [192, 251];
const [lowerY, upperY] = [-89, -59];

// Part 1

const triangleNum = (n) => (n * (n + 1)) / 2;

const triangleRoot = (x) => (Math.sqrt(8 * x + 1) - 1) / 2;

/**
 * y for some step is the sum of previous vY.
 * Since vY changes with -1 for each step, and
 * the highest y is acheived with a initial
 * positive vY, the height reached (y-max) becomes
 * the triangular number of the initial vY. Likewise,
 * the way down until y=0 is the same triangular number
 * but negative. The step at y=0 should have a vY
 * that causes the next y to be exactly at the
 * lower-bound y of the target area, since that
 * results in the highest triangular number which
 * results in the highest y-max in the initial arc.
 *
 * vX is irrelevant since it changes independently.
 */
const first = () => {
  return triangleNum(-1 * lowerY - 1);
};

// Part 2

const step = (state) => {
  const { x, y, vx, vy } = state;
  return {
    x: x + vx,
    y: y + vy,
    vx: vx > 0 ? vx - 1 : 0,
    vy: vy - 1
  };
};

const hasPassed = (x, y, maxX, minY) => x > maxX || y < minY;

// More or less brute force
const second = () => {
  const velocities = [];
  for (let vx = Math.round(triangleRoot(lowerX)); vx <= upperX; vx++) {
    for (let vy = -100; vy <= 100; vy++) {
      let state = { x: 0, y: 0, vx, vy };
      while (!hasPassed(state.x, state.y, upperX, lowerY)) {
        state = step(state);
        const { x, y } = state;
        if (x >= lowerX && x <= upperX && y >= lowerY && y <= upperY) {
          velocities.push([vx, vy]);
          break;
        }
      }
    }
  }
  return velocities.length;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
