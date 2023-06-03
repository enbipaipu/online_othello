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

export const boardRepository = {
  getBoard: (): BoardArr => board,
  clickBoard: (params: Pos, userId: UserId): BoardArr => {
    board[params.y][params.x] = userColorRepository.getUserColor(userId);
    return board;
  },
};
