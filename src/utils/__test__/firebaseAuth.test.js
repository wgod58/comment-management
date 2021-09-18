import * as admin from 'firebase-admin';
import * as userService from 'services/fabryque/user';
import {
  checkIdTokenAgainstUserEmail,
  checkIdTokenAgainstUserId,
  checkIdTokenAsync,
  decodeIdToken,
} from 'utils/firebaseAuth';

jest.mock('firebase-admin');
describe('Firebase Auth Utils Test', () => {
  const verifyIdTokenMock = jest.fn();

  // mock firebase admin
  beforeAll(() => {
    // Complete firebase-admin mocks
    // eslint-disable-next-line no-import-assign
    admin.auth = jest.fn().mockReturnValue({
      verifyIdToken: verifyIdTokenMock,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getUserByEmailMock = jest.spyOn(userService, 'getUserByEmail');

  describe('Test decodeIdToken()', () => {
    const decodedMock = 'decoded token';
    const tokenInputMock = 'encoded token';

    test('Should return token', async () => {
      verifyIdTokenMock.mockResolvedValueOnce(decodedMock);
      const token = await decodeIdToken(tokenInputMock);

      expect(token).toBe(decodedMock);
      expect(verifyIdTokenMock).toBeCalledTimes(1);
      expect(verifyIdTokenMock).toBeCalledWith(tokenInputMock);
    });
    test('Should return null', async () => {
      verifyIdTokenMock.mockRejectedValueOnce(Error('test'));
      const token = await decodeIdToken(tokenInputMock);

      expect(token).toBe(null);
      expect(verifyIdTokenMock).toBeCalledTimes(1);
      expect(verifyIdTokenMock).toBeCalledWith(tokenInputMock);
    });
  });

  describe('Test checkIdTokenAsync()', () => {
    const email = 'theEmail';
    const userId = 'theUserId';
    const decodedTokenMock = {
      email,
    };

    test('Should return true by checking user email', async () => {
      expect(await checkIdTokenAsync(decodedTokenMock, { email })).toBe(true);
    });
    test('Should return true token by checking user id', async () => {
      getUserByEmailMock.mockResolvedValueOnce({
        id: userId,
      });

      const result = await checkIdTokenAsync(decodedTokenMock, {
        id: userId,
      });

      expect(result).toBe(true);
      expect(getUserByEmailMock).toBeCalledTimes(1);
      expect(getUserByEmailMock).toBeCalledWith(email);
    });
    test('Should throw error', async () => {
      try {
        await checkIdTokenAsync({}, {});
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('No email or id provided for token validation.');
      }
    });
  });

  describe('Test checkIdTokenAgainstUserEmail()', () => {
    test('Should return true', () => {
      const emailMock = 'user@example.com';

      expect(
        checkIdTokenAgainstUserEmail({ email: emailMock }, emailMock),
      ).toBe(true);
    });
    test('Should throw error', () => {
      try {
        checkIdTokenAgainstUserEmail({}, {});
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Decoded token email does not match');
      }
    });
  });

  describe('Test checkIdTokenAgainstUserId()', () => {
    const userId = 'theUserId';
    const emailMock = 'user@example.com';

    test('Should return true', async () => {
      getUserByEmailMock.mockResolvedValueOnce({
        id: userId,
      });
      expect(
        await checkIdTokenAgainstUserId({ email: emailMock }, userId),
      ).toBe(true);
    });
    test('Should throw error', async () => {
      getUserByEmailMock.mockResolvedValueOnce({
        id: 'somethingElse',
      });

      try {
        await checkIdTokenAgainstUserId({ email: emailMock }, userId);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Decoded token userId does not match');
      }
    });
    test('Should throw error', async () => {
      try {
        await checkIdTokenAgainstUserId({}, {});
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Decoded token userId does not match');
      }
    });
  });
});
