<<<<<<< HEAD
=======
// import type { UserId } from '$/commonTypesWithClient/branded';
// const userColorDict: { black?: UserId; white?: UserId } = {};

// export const userColorUsecase = {
//   getUserColor: (userId: UserId): number => {
//     if (userColorDict.black === userId) {
//       return 1;
//     } else if (userColorDict.white === userId) {
//       return 2;
//     } else if (userColorDict.black === undefined) {
//       userColorDict.black = userId;
//       return 1;
//     } else {
//       userColorDict.white = userId;
//       return 2;
//     }
//   },
// };
>>>>>>> origin/main
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
