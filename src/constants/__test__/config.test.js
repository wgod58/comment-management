import CONFIG from '../config';

describe('Test Config', () => {
  test('Should contains keys', () => {
    expect(Object.keys(CONFIG)).toEqual([
      'APP_NAME',
      'BASE_URL',
      'ENVIRONMENT',
      'FABRYQUE_PWA_UNSUBSCRIBE',
      'SERVER_PORT',
      'BOA_URL',
      'GCP',
      'DATABASE',
      'EMAIL_MANAGEMENT',
      'STAFF_HANDLERS',
      'SKNAPP_ACCESS_TOKEN',
    ]);
  });
});
