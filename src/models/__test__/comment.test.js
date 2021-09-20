import commentModel from 'models/schemas/comment';

describe('commentModel orm', () => {
  test('commentModel test', async () => {
    const result = commentModel.rawAttributes;

    expect(Object.keys(result)).toMatchObject([
      'id',
      'comment',
      'deleteMark',
      'createdAt',
      'updatedAt',
    ]);
  });
});
