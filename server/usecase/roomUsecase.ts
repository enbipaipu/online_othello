import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
import { roomIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { boardUsecase } from './boardUsecase';

const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
export const roomUsecase = {
  create: async (): Promise<RoomModel> => {
    const newRoom: RoomModel = {
      id: roomIdParser.parse(randomUUID()),
      board: initBoard(),
      status: 'waiting',
      created: Date.now(),
    };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
  clickBoard: async (x: number, y: number, userId: UserId): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリック出来てるんだからRoomが無いわけない');

    let newBoard: number[][] = JSON.parse(JSON.stringify(latest.board));
    newBoard = boardUsecase.clickBoard(x, y, userId);

    const newRoom: RoomModel = { ...latest, board: newBoard };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
};
