import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorrepository';

export type BoardArr = number[][];
export type Pos = { x: number; y: number };

const board: BoardArr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const around = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
const boardTerms = function (
  y: number,
  x: number,
  s: number[],
  turnColor: number,
  distance: number
) {
  let passThrough = false;
  if (board[y + s[0] * distance][x + s[1] * distance] === 3 - turnColor) {
    passThrough = true;
  } else if (board[y + s[0] * distance][x + s[1] * distance] === turnColor) {
    if (passThrough) {
      for (let i = distance; i > -1; i--) {
        board[y + s[0] * i][x + s[1] * i] = turnColor;
      }
    }
  }
  return board;
};

const distanceBoard = function (y: number, x: number, s: number[], turnColor: number) {
  let ok = true;

  if (ok) {
    for (let distance = 1; distance < 3; distance += 1) {
      if (
        board[y + s[0] * distance] === undefined ||
        board[y + s[0] * distance][x + s[1] * distance] === 0
      ) {
        ok = false;
      } else {
        boardTerms(y, x, s, turnColor, distance);
      }
    }
  }
  return board;
};

export const boardRepository = {
  getBoard: (): BoardArr => board,
  clickBoard: (params: Pos, userId: UserId): BoardArr => {
    if (board[params.y][params.x] === 0) {
      for (const s of around) {
        distanceBoard(params.y, params.x, s, userColorRepository.getUserColor(userId));
      }
    }
    return board;
  },
};
