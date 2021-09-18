import * as userController from 'controllers/user';
jest.mock('@google-cloud/secret-manager');
jest.mock('@google-cloud/storage');
jest.mock('node-fetch');

describe('user model api', () => {
  describe('user model1', () => {
    test('user works', async () => {
      const res1 = await userController.unsubscribe({});

      expect(res1).toMatchObject({
        status: 400,
        message: 'miss params email',
      });
      const res2 = await userController.createSubscribeUser({});

      expect(res2).toMatchObject({
        status: 400,
        message: 'Missed parameters: email.',
      });
    });
  });
});
