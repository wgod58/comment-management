import avatarSkin from 'models/schemas/avatar/avatarSkin';

describe('avatarSkin orm', () => {
  test('avatarSkin test', async () => {
    const result = avatarSkin.rawAttributes;

    expect(Object.keys(result)).toMatchObject(['id', 'name', 'createdAt']);
  });
});
