import * as admin from 'firebase-admin';
import CONFIG from 'constants/config';
import {
  createUser,
  decodeStaffIdToken,
  generateEmailVerificationLink,
  generatePasswordResetLink,
  getTenantAuth,
  reCreateActionLink,
} from 'utils/firebaseTenantAuth';

jest.mock('firebase-admin');

describe('Firebase Tenant Auth Utils Tests', () => {
  const mockUrl = 'https://www.exmaple.com/';
  const createUserMock = jest.fn();
  const generateEmailVerificationLinkMock = jest.fn();
  const generatePasswordResetLinkMock = jest.fn();
  const verifyIdTokenMock = jest.fn();

  const authForTenantInstance = {
    createUser: createUserMock,
    generateEmailVerificationLink: generateEmailVerificationLinkMock,
    generatePasswordResetLink: generatePasswordResetLinkMock,
    verifyIdToken: verifyIdTokenMock,
  };

  beforeAll(() => {
    CONFIG.BOA_URL = mockUrl;

    // Complete firebase-admin mocks
    // eslint-disable-next-line no-import-assign
    admin.auth = jest.fn().mockReturnValue({
      tenantManager: () => {
        return {
          authForTenant: () => {
            return authForTenantInstance;
          },
        };
      },
    });
  });

  afterAll(() => {
    jest.unmock('firebase-admin');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Test getTenantAuth', () => {
    test('Test use case', () => {
      expect(getTenantAuth()).toEqual(authForTenantInstance);
    });
  });

  describe('Test createUser', () => {
    const user = {
      id: '112',
      name: 'user',
    };
    const paramObj = {
      displayName: 'name',
      email: 'email',
      password: 'password',
    };

    test('Test positive', async () => {
      createUserMock.mockResolvedValueOnce(user);
      const result = await createUser(paramObj);

      expect(createUserMock).toBeCalledTimes(1);
      expect(createUserMock).toBeCalledWith(paramObj);
      expect(result).toBe(user);
    });
    test('Test negative: return null', async () => {
      createUserMock.mockRejectedValueOnce(Error('test'));
      expect(await createUser(paramObj)).toBe(null);
      expect(createUserMock).toBeCalledTimes(1);
      expect(createUserMock).toBeCalledWith(paramObj);
    });
    test('Test negative: err.message and err.code not defined', async () => {
      createUserMock.mockRejectedValueOnce({
        a: 1,
      });
      expect(await createUser(paramObj)).toBe(null);
      expect(createUserMock).toBeCalledTimes(1);
      expect(createUserMock).toBeCalledWith(paramObj);
    });
  });

  describe('Test generateEmailVerificationLink', () => {
    const email = 'email@example.com';
    const generatedLink = 'https://test/auth?mode=test&code=1234';

    test('Test positive', async () => {
      generateEmailVerificationLinkMock.mockResolvedValueOnce(generatedLink);
      const result = await generateEmailVerificationLink(email);

      expect(generateEmailVerificationLinkMock).toBeCalledTimes(1);
      expect(generateEmailVerificationLinkMock).toBeCalledWith(email);
      expect(result).toBe(reCreateActionLink(generatedLink));
    });
    test('Test negative: return null', async () => {
      generateEmailVerificationLinkMock.mockRejectedValueOnce(Error('test'));
      const result = await generateEmailVerificationLink(email);

      expect(generateEmailVerificationLinkMock).toBeCalledTimes(1);
      expect(generateEmailVerificationLinkMock).toBeCalledWith(email);
      expect(result).toBe(null);
    });
    test('Test negative: err.message and err.code not defined', async () => {
      generateEmailVerificationLinkMock.mockRejectedValueOnce({});
      const result = await generateEmailVerificationLink(email);

      expect(generateEmailVerificationLinkMock).toBeCalledTimes(1);
      expect(generateEmailVerificationLinkMock).toBeCalledWith(email);
      expect(result).toBe(null);
    });
  });

  describe('Test generatePasswordResetLink', () => {
    const email = 'email@example.com';
    const generatedLink = 'https://test/auth?mode=test&code=1234';

    test('Test positive', async () => {
      generatePasswordResetLinkMock.mockResolvedValueOnce(generatedLink);
      const result = await generatePasswordResetLink(email);

      expect(generatePasswordResetLinkMock).toBeCalledTimes(1);
      expect(generatePasswordResetLinkMock).toBeCalledWith(email);
      expect(result).toBe(reCreateActionLink(generatedLink));
    });
  });

  describe('Test reCreateActionLink', () => {
    const urlQuery = 'auth?mode=test&code=1234';
    const correctMockLink = 'https://test/' + urlQuery;
    const incorrectMockLink = 'https://hihi.com';

    test('Test positive', () => {
      const result = reCreateActionLink(correctMockLink);

      expect(result).toBe(mockUrl + urlQuery);
    });
    test('Test positive', () => {
      expect(() => {
        reCreateActionLink(incorrectMockLink);
      }).toThrowError(Error('Action link provided is incorrect'));
    });
  });
  describe('Test decodeStaffIdToken()', () => {
    const decodedMock = 'decoded token';
    const tokenInputMock = 'encoded token';

    test('Should return token', async () => {
      verifyIdTokenMock.mockResolvedValueOnce(decodedMock);
      const token = await decodeStaffIdToken(tokenInputMock);

      expect(token).toBe(decodedMock);
      expect(verifyIdTokenMock).toBeCalledTimes(1);
      expect(verifyIdTokenMock).toBeCalledWith(tokenInputMock);
    });
    test('Should return null', async () => {
      verifyIdTokenMock.mockRejectedValueOnce(Error('test'));
      const token = await decodeStaffIdToken(tokenInputMock);

      expect(token).toBe(null);
      expect(verifyIdTokenMock).toBeCalledTimes(1);
      expect(verifyIdTokenMock).toBeCalledWith(tokenInputMock);
    });
  });
});
