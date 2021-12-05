import fs from 'fs';

export const read = (day) => {
  if (day === 0) return;
  const fileString = fs.readFileSync(`inputs/${day}.txt`, 'utf8');
  return fileString.toString().trim();
};

export const numList = (input) => input.split('\n').map((str) => Number(str));

export const readToList = (day, type, splitOn = ' ') =>
  read(day)
    .split('\n')
    .map((str) => str.split(splitOn).map((e, i) => type[i](e)));
