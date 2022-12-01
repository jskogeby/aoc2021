import { sum } from './utils/math.js';

const start = [7, 4];

// Part 1

const posAfterSteps = (prevPos, steps) => ((prevPos + steps - 1) % 10) + 1;

const first = () => {
  let nextRoll = 1;
  const pos = [...start];
  const scores = [0, 0];
  let turn = 0;
  while (scores.every((score) => score < 1000)) {
    pos[turn] = posAfterSteps(pos[turn], nextRoll * 3 + 3);
    nextRoll += 3;
    scores[turn] += pos[turn];
    turn = turn === 0 ? 1 : 0;
  }
  return Math.min(...scores) * (nextRoll - 1);
};

// Part 2

const memoKey = (i, j, pos, turn) =>
  `${i},${j},${pos.pos1},${pos.pos2},${turn}`;

const second = () => {
  const wins = Array(31);
  for (let i = 0; i < 31; i++) {
    wins[i] = Array(31).fill(() => (i > 20 ? 1 : 0));
  }
  const memo = {};
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
      wins[i][j] = (pos, turn) => {
        const key = memoKey(i, j, pos, turn);
        if (key in memo) {
          return memo[key];
        }
        const posSteps = [];
        for (const a of [1, 2, 3]) {
          for (const b of [1, 2, 3]) {
            for (const c of [1, 2, 3]) {
              posSteps.push(posAfterSteps(pos[turn], a + b + c));
            }
          }
        }
        const nextTurn = turn === 'pos1' ? 'pos2' : 'pos1';
        const result = posSteps
          .map((posStep) =>
            turn === 'pos1'
              ? wins[i + posStep][j]({ ...pos, [turn]: posStep }, nextTurn)
              : wins[i][j + posStep]({ ...pos, [turn]: posStep }, nextTurn)
          )
          .reduce(sum);
        memo[key] = result;
        return result;
      };
    }
  }
  return wins[0][0]({ pos1: start[0], pos2: start[1] }, 'pos1');
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
