import { boardRepository } from './boardRepository';

export const AroundBoard = {
  aroundBoard: (y: number, x: number, i: number[]) => {
    for (let dis = 1; dis < 8; dis += 1) {
      const board = boardRepository.getBoard();
      if (board[y + i[0] * dis][x + i[1] * dis] === 1) {
        //
      }
    }
  },
};
