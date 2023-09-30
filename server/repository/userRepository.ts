import type { UserId } from '$/commonTypesWithClient/branded';
import { prismaClient } from '$/service/prismaClient';
import { randomUUID } from 'crypto';

export const userRepository = {
  getUserInfo: async (user: UserId) => {
    const userInfo = prismaClient.user.findFirst({
      where: {
        id: user,
      },
    });
    return userInfo;
  },
  create: async () => {
    const newUserId = randomUUID();
    const newUser = await prismaClient.user.create({
      data: {
        id: newUserId,
      },
    });
    return newUser;
  },
};
