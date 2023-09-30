import type { UserId } from '$/commonTypesWithClient/branded';

const userColorDict: { [color: string]: UserId } = {};

export const userColorUsecase = {
  getUserColor: (userId: UserId): number => {
    const userCount = Object.keys(userColorDict).length;

    if (userCount % 2 === 0) {
      userColorDict[`color${userCount + 1}`] = userId;
      return 2;
    } else {
      userColorDict[`color${userCount + 1}`] = userId;
      return 1;
    }
  },
};
