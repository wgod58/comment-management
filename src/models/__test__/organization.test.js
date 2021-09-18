import organizationModel from 'models/schemas/organization';

describe('organizationModel orm', () => {
  test('organizationModel test', async () => {
    const result = organizationModel.rawAttributes;

    expect(Object.keys(result)).toMatchObject([
      'id',
      'orgName',
      'createdAt',
      'updatedAt',
    ]);
  });
});
