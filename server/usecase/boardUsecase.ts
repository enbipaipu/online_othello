import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorUsecase } from './userColorUsecase';

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

const aroundS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
console.table(board);

let passThrough = false;
let putStone = false;
let turn = 1;

const boardTerms = function (
  y: number,
  x: number,
  around: number[],
  turnColor: number,
  distance: number
) {
  if (board[y + around[0] * distance][x + around[1] * distance] === 3 - turnColor) {
    passThrough = true;
  } else if (board[y + around[0] * distance][x + around[1] * distance] === turnColor) {
    if (passThrough) {
      putStone = true;
      for (let i = distance; i > -1; i--) {
        board[y + around[0] * i][x + around[1] * i] = turnColor;
      }
    }
  }
};

const distanceBoard = function (y: number, x: number, around: number[], turnColor: number) {
  let ok = true;
  passThrough = false;
  for (let distance = 1; distance < 8; distance += 1) {
    if (ok) {
      if (
        board[y + around[0] * distance] === undefined ||
        board[y + around[0] * distance][x + around[1] * distance] === 0
      ) {
        ok = false;
      } else {
        boardTerms(y, x, around, turnColor, distance);
      }
    }
  }
};

export const boardUsecase = {
  getBoard: (): BoardArr => board,
  clickBoard: (x: number, y: number, userId: UserId): BoardArr => {
    if (turn === userColorUsecase.getUserColor(userId)) {
      if (board[y][x] === 0) {
        console.log('bbbbbbbb');
        console.log(turn);
        for (const around of aroundS) {
          distanceBoard(y, x, around, userColorUsecase.getUserColor(userId));
        }
        if (putStone) {
          turn = 3 - turn;
        }
      }
      // makeCandidate(userColorUsecase.getUserColor(userId));
    }
    return board;
  },
  getTurn: () => {
    return turn;
  },
};
