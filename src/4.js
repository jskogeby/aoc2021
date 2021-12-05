import { read } from './utils/read.js';

const format = (inp) => {
  const sections = inp.split('\n\n');
  const draws = sections[0].split(',').map(Number);
  const boards = sections.slice(1).map((board) =>
    board.split('\n').map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((cell) => ({ value: Number(cell), marked: false }))
    )
  );
  return { draws, boards };
};

const input = format(read(4));

// Part 1

const transpose = (board) =>
  board.reduce(
    (acc, current) => {
      current.forEach((cell, i) => acc[i].push(cell));
      return acc;
    },
    board.map(() => [])
  );

const isBingo = (board) =>
  board
    .concat(transpose(board))
    .some((row) => row.every((cell) => cell.marked));

const unmarkedSum = (board) =>
  board
    .flat()
    .reduce((acc, current) => (current.marked ? acc : acc + current.value), 0);

const mark = (draw, boards) => {
  boards.forEach((board) =>
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value === draw) cell.marked = true;
      });
    })
  );
};

const first = () => {
  const { draws, boards } = input;
  for (const draw of draws) {
    mark(draw, boards);
    const winner = boards.find(isBingo);
    if (winner) {
      return draw * unmarkedSum(winner);
    }
  }
  return 0;
};

// Part 2

const second = () => {
  const { draws, boards } = input;
  let lastBoard;
  for (const draw of draws) {
    mark(draw, boards);
    const remaining = boards
      .map((board, i) => (isBingo(board) ? 0 : i))
      .filter((idx) => idx !== 0);
    if (remaining.length === 1) {
      lastBoard = remaining[0];
    }
    if (remaining.length === 0) {
      return draw * unmarkedSum(boards[lastBoard]);
    }
  }
  return 0;
};

// Result

console.log('Part 1: ' + String(first()));
console.log('Part 2: ' + String(second()));
