import type { UserId } from '$/commonTypesWithClient/branded';

export type Methods = {
  post: {
    reqBody: UserId;
    resBody: UserId;
  };
};
