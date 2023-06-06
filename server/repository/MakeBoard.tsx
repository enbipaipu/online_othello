import { AroundBoard } from './AroundBoard';

export const makeBoard = {
  makeBoard: () => {
    for (let y = 0; y < 8; y += 1) {
      for (let x = 0; x < 8; x += 1) {
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
        for (const i of around) {
          AroundBoard.aroundBoard(y, x, i);
        }
      }
    }
  },
};
