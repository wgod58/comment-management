import avatarBackground from 'models/schemas/avatar/avatarBackground';
import avatarSkin from 'models/schemas/avatar/avatarSkin';
import usersFavoriteAvatarTheme from 'models/schemas/avatar/userFavoriteAvatarTheme';
import {
  createAvatarBackground,
  createAvatarSkin,
  createUserFavoriteAvatarTheme,
  deleteAvatarBackground,
  deleteAvatarSkin,
  deleteUserFavoriteAvatarTheme,
  getAllAvatarBackgrounds,
  getAllAvatarSkins,
  getAvatarBackgroundById,
  getAvatarBackgroundByName,
  getAvatarSkinById,
  getAvatarSkinByName,
  getFavoriteAvatarThemesByUserId,
} from '../avatar';

describe('Users Favorite Avatar Theme API test', () => {
  test('getFavoriteAvatarThemesByUserId', async () => {
    const checkResult = ['abc', 'def', 'ghi'];
    const findAllMock = jest.spyOn(usersFavoriteAvatarTheme, 'findAll');

    findAllMock.mockResolvedValueOnce(checkResult);
    const result = await getFavoriteAvatarThemesByUserId(123);

    expect(findAllMock).toBeCalledWith({
      where: { delmk: 0, userId: 123 },
      raw: true,
    });
    expect(result).toBe(checkResult);
  });

  test('createUserFavoriteAvatarTheme', async () => {
    const fakeData = [
      { dataValues: { name: 'test' } },
      { dataValues: { name: 'Test test 123321' } },
    ];
    const checkResult = ['created'];

    const findAllMock = jest.spyOn(usersFavoriteAvatarTheme, 'findAll');
    const createMock = jest.spyOn(usersFavoriteAvatarTheme, 'create');

    findAllMock.mockResolvedValue(fakeData);

    // case: repeated name
    const resultRepeatedName = await createUserFavoriteAvatarTheme({
      avatarColor: 'avatarColor',
      backgroundId: 1,
      isFlatshading: true,
      metalness: 0.5,
      name: ' test',
      skinId: 1,
      userId: 2,
      wireframeColor: '',
    });

    expect(resultRepeatedName).toBe(null);
    expect(createMock).toBeCalledTimes(0);

    // case: success
    const testName = ' special ';

    createMock.mockResolvedValueOnce(checkResult);

    const resultSuccess = await createUserFavoriteAvatarTheme({
      avatarColor: 'avatarColor',
      backgroundId: 1,
      isFlatshading: true,
      metalness: 0.5,
      name: testName,
      skinId: 1,
      userId: 2,
      wireframeColor: '',
    });

    expect(resultSuccess).toBe(checkResult);
    expect(createMock).toBeCalled();
    expect(createMock).toBeCalledWith({
      avatarColor: 'avatarColor',
      backgroundId: 1,
      isFlatshading: true,
      metalness: 0.5,
      name: testName.trim(),
      skinId: 1,
      userId: 2,
      wireframeColor: '',
    });
  });

  test('deleteUserFavoriteAvatarTheme', async () => {
    const updateMock = jest.spyOn(usersFavoriteAvatarTheme, 'update');

    updateMock.mockResolvedValueOnce([1]);
    const result = await deleteUserFavoriteAvatarTheme(123);

    expect(updateMock).toBeCalledWith({ delmk: 1 }, { where: { id: 123 } });
    expect(result).toBe(1);
  });
});

describe('Avatar Skin api test', () => {
  test('getAllAvatarSkins', async () => {
    const checkResult = ['abc', 'def', 'ghi'];
    const findAllMock = jest.spyOn(avatarSkin, 'findAll');

    findAllMock.mockResolvedValueOnce(checkResult);
    const result = await getAllAvatarSkins();

    expect(findAllMock).toBeCalled();
    expect(result).toBe(checkResult);
  });

  test('getAvatarSkinByName', async () => {
    const checkResult = { id: 1, name: 'name', createdAt: 'createdAt' };
    const findOneMock = jest.spyOn(avatarSkin, 'findOne');

    findOneMock.mockResolvedValueOnce(checkResult);
    const result = await getAvatarSkinByName('name');

    expect(findOneMock).toBeCalledWith({ where: { name: 'name' }, raw: true });
    expect(result).toBe(checkResult);
  });

  test('getAvatarSkinById', async () => {
    const checkResult = { id: 1, name: 'name', createdAt: 'createdAt' };
    const findOneMock = jest.spyOn(avatarSkin, 'findOne');

    findOneMock.mockResolvedValueOnce(checkResult);
    const result = await getAvatarSkinById(123);

    expect(findOneMock).toBeCalledWith({ where: { id: 123 } });
    expect(result).toBe(checkResult);
  });

  test('createAvatarSkin', async () => {
    const createMock = jest.spyOn(avatarSkin, 'create');

    createMock.mockResolvedValueOnce('created');
    const result = await createAvatarSkin('skinName');

    expect(createMock).toBeCalledWith({ name: 'skinName' });
    expect(result).toBe('created');
  });

  test('deleteAvatarSkin', async () => {
    const checkResult = 1;
    const destroyMock = jest.spyOn(avatarSkin, 'destroy');

    destroyMock.mockResolvedValueOnce(checkResult);
    const result = await deleteAvatarSkin(123);

    expect(destroyMock).toBeCalledWith({ where: { id: 123 } });
    expect(result).toBe(checkResult);
  });
});

describe('Avatar Background api test', () => {
  test('getAllAvatarSkins', async () => {
    const checkResult = ['abc', 'def', 'ghi'];
    const findAllMock = jest.spyOn(avatarBackground, 'findAll');

    findAllMock.mockResolvedValueOnce(checkResult);
    const result = await getAllAvatarBackgrounds();

    expect(findAllMock).toBeCalled();
    expect(result).toBe(checkResult);
  });

  test('getAvatarBackgroundByName', async () => {
    const checkResult = { id: 1, name: 'name', createdAt: 'createdAt' };
    const findOneMock = jest.spyOn(avatarBackground, 'findOne');

    findOneMock.mockResolvedValueOnce(checkResult);
    const result = await getAvatarBackgroundByName('name');

    expect(findOneMock).toBeCalledWith({ where: { name: 'name' }, raw: true });
    expect(result).toBe(checkResult);
  });

  test('getAvatarBackgroundById', async () => {
    const checkResult = { id: 1, name: 'name', createdAt: 'createdAt' };
    const findOneMock = jest.spyOn(avatarBackground, 'findOne');

    findOneMock.mockResolvedValueOnce(checkResult);
    const result = await getAvatarBackgroundById(123);

    expect(findOneMock).toBeCalledWith({ where: { id: 123 } });
    expect(result).toBe(checkResult);
  });

  test('createAvatarBackground', async () => {
    const createMock = jest.spyOn(avatarBackground, 'create');

    createMock.mockResolvedValueOnce('created');
    const result = await createAvatarBackground('backgroundName');

    expect(createMock).toBeCalledWith({ name: 'backgroundName' });
    expect(result).toBe('created');
  });

  test('deleteAvatarBackground', async () => {
    const checkResult = 1;
    const destroyMock = jest.spyOn(avatarBackground, 'destroy');

    destroyMock.mockResolvedValueOnce(checkResult);
    const result = await deleteAvatarBackground(123);

    expect(destroyMock).toBeCalledWith({ where: { id: 123 } });
    expect(result).toBe(checkResult);
  });
});
