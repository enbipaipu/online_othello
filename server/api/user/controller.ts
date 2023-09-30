import { userUsecase } from '$/usecase/userUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({ status: 200, body: await userUsecase.getUserId(body.userId) }),
}));
