import CONFIG from '../config';

describe('Test Config', () => {
  test('Should contains keys', () => {
    expect(Object.keys(CONFIG)).toEqual([
      'APP_NAME',
      'BASE_URL',
      'ENVIRONMENT',
      'SERVER_PORT',
      'DATABASE',
    ]);
  });
});
