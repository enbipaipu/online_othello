import type { UserId } from '$/commonTypesWithClient/branded';
import { userRepository } from '$/repository/userRepository';

export const userUsecase = {
  getUserId: async (userId: UserId) => {
    const userInfo = await userRepository.getUserInfo(userId);
    if (userInfo === null) {
      return (await userRepository.create()).id;
    }
    return userInfo.id;
  },
};
