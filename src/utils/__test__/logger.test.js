import logger from 'utils/logger';

describe('Test logger', () => {
  const consoleLogSpy = jest.spyOn(global.console, 'log');
  const testMsg = 'testing';
  const testObj = {
    a: 1,
    b: 2,
    c: {
      a: 1,
    },
  };

  describe('Test logger info', () => {
    test('Should work when input string', () => {
      logger.info(testMsg);
      expect(consoleLogSpy).toBeCalledTimes(1);
      expect(consoleLogSpy.mock.calls[0][0].msg).toBe(testMsg);
      expect(consoleLogSpy.mock.calls[0][0].level).toBe('info');
    });
    test('Should work when input object', () => {
      logger.info(testObj);
      expect(consoleLogSpy).toBeCalledTimes(1);
      const logObj = consoleLogSpy.mock.calls[0][0];

      expect(logObj.a).toBe(testObj.a);
      expect(logObj.b).toBe(testObj.b);
      expect(logObj.c).toEqual(testObj.c);
    });
    test('Should work when input string, object', () => {
      logger.info('testObj', testObj);
      expect(consoleLogSpy).toBeCalledTimes(1);
      expect(typeof consoleLogSpy.mock.calls[0][0].msg).toBe('string');
    });
  });
  describe('Test logger error', () => {
    test('Should work when input string', () => {
      logger.error(testMsg);
      expect(consoleLogSpy).toBeCalledTimes(1);
      expect(consoleLogSpy.mock.calls[0][0].msg).toBe(testMsg);
      expect(consoleLogSpy.mock.calls[0][0].level).toBe('error');
    });
  });
});
