import commentModel from 'models/schemas/comment';

describe('commentModel orm', () => {
  test('commentModel test', async () => {
    const result = commentModel.rawAttributes;

    expect(Object.keys(result)).toMatchObject([
      'id',
      'organizationId',
      'comment',
      'deleteMark',
      'createdAt',
      'updatedAt',
    ]);
  });
});
