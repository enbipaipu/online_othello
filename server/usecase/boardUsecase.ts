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
// let passStone = false;
// const changeZeroToThree = () => {
//   for (let y = 0; y < 8; y++) {
//     for (let x = 0; x < 8; x++) {
//       if (board[y][x] === 3) {
//         board[y][x] = 0;
//       }
//     }
//   }
// };
// const checkBoardTerms2 = (
//   y: number,
//   x: number,
//   turnColor: number,
//   s: number[],
//   ok: boolean,
//   passStone: boolean,
//   distance: number
// ) => {
//   if (board[y + s[0] * distance][x + s[1] * distance] === turnColor) {
//     passStone = true;
//   } else if (board[y + s[0] * distance][x + s[1] * distance] === 3 - turnColor) {
//     if (passStone) {
//       board[y][x] = 3;
//     }
//   }
// };

// const checkBoardTerms = (
//   y: number,
//   x: number,
//   turnColor: number,
//   s: number[],
//   ok: boolean,
//   passStone: boolean
// ) => {
//   for (let distance = 1; distance < 8; distance++) {
//     if (
//       board[y + s[0] * distance] === undefined ||
//       board[y + s[0] * distance][x + s[1] * distance] === undefined ||
//       board[y + s[0] * distance][x + s[1] * distance] === 0
//     ) {
//       ok = false;
//     } else {
//       checkBoardTerms2(y, x, turnColor, s, ok, passStone, distance);
//     }
//   }
// };

// const checkBoard = (y: number, x: number, turnColor: number) => {
//   for (const s of aroundS) {
//     const ok = true;
//     passStone = false;
//     if (ok) {
//       checkBoardTerms(y, x, turnColor, s, ok, passStone);
//     }
//   }
// };

// const makeCandidate = (turnColor: number) => {
//   //前回のboardの候補地を削除
//   changeZeroToThree();

//   //次のboardの候補地を作成
//   for (let y = 0; y < 8; y++) {
//     for (let x = 0; x < 8; x++) {
//       if (board[y][x] === 0) {
//         checkBoard(y, x, turnColor);
//       }
//     }
//   }
// };

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
};
