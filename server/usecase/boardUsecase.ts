import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorUsecase } from './userColorUsecase';

export type BoardArr = number[][];
export type Pos = { x: number; y: number };

const board: BoardArr = [
  [0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
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

let passThrough = false;
const changeZeroToThree = () => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === 3) {
        board[y][x] = 0;
      }
    }
  }
};

const makeCandidate = (turnColor: number) => {
  //前回のboardの候補地を削除
  changeZeroToThree();

  //次のboardの候補地を作成
  // for (let y = 0; y < 8; y++) {
  //   for (let x = 0; x < 8; x++) {
  //     if (board[y][x] === 0) {
  //       for (const s of aroundS) {
  //         passThrough = false;
  //         for (let distance = 1; distance < 8; distance++) {
  //           if (
  //             board[y + s[0] * distance] === undefined ||
  //             board[y + s[0] * distance][x + s[1] * distance] === undefined ||
  //             board[y + s[0] * distance][x + s[1] * distance] === 0
  //           ) {
  //             break;
  //           } else if (board[y + s[0] * distance][x + s[1] * distance] === turnColor) {
  //             passThrough = true;
  //           } else if (board[y + s[0] * distance][x + s[1] * distance] === 3 - turnColor) {
  //             if (passThrough) {
  //               board[y][x] = 3;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
};

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
  makeCandidate(turnColor);
};

let turn = 1;
export const boardUsecase = {
  getBoard: (): BoardArr => board,
  clickBoard: (x: number, y: number, userId: UserId): BoardArr => {
    if (turn === userColorUsecase.getUserColor(userId)) {
      if (board[y][x] === 3) {
        console.log('bbbbbbbb');
        for (const around of aroundS) {
          distanceBoard(y, x, around, userColorUsecase.getUserColor(userId));
        }
      }
      makeCandidate(userColorUsecase.getUserColor(userId));

      turn = 3 - turn;
    }
    return board;
  },
};
