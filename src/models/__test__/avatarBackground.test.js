import avatarBackground from 'models/schemas/avatar/avatarBackground';

describe('avatarBackground orm', () => {
  test('avatarBackground test', async () => {
    const result = avatarBackground.rawAttributes;

    expect(Object.keys(result)).toMatchObject(['id', 'name', 'createdAt']);
  });
});
