import {
  avatarBackgroundSchema,
  avatarSkinSchema,
  userFavoriteAvatarThemeSchema,
} from 'models';
import { cache } from 'utils/cache';
import { normalizeStr } from 'utils/stringTransfer';

/**
 * get user custom favorite avatar theme by user id
 * @param {int} userId
 */
const getFavoriteAvatarThemesByUserId = async (userId) => {
  if (!userId) return null;
  const cacheValue = cache.get(`getFavoriteAvatarThemesByUserId ${userId}`);

  if (cacheValue) return cacheValue;
  const usersFavoriteAvatarTheme = await userFavoriteAvatarThemeSchema.findAll({
    where: { userId, delmk: 0 },
    raw: true,
  });

  cache.set(
    `getFavoriteAvatarThemesByUserId ${userId}`,
    usersFavoriteAvatarTheme,
  );

  return usersFavoriteAvatarTheme;
};

/**
 * create new avatar favorite theme for user
 * @param {object} avatarThemeInput:
 *  @param {int} skinId,
 *  @param {int} backgroundId,
 *  @param {float} metalness,
 *  @param {string} avatarColor,
 *  @param {string} wireframeColor,
 *  @param {boolean} isFlatshading,
 */
const createUserFavoriteAvatarTheme = async (avatarThemeInput) => {
  const {
    userId,
    name,
    skinId,
    backgroundId,
    metalness,
    avatarColor,
    wireframeColor,
    isFlatshading,
  } = avatarThemeInput;

  const avatarFavorites = await userFavoriteAvatarThemeSchema.findAll({
    where: { userId, delmk: 0 },
  });

  if (avatarFavorites.length > 0) {
    const nameList = avatarFavorites.map((item) =>
      normalizeStr(item.dataValues.name),
    );

    if (nameList.includes(normalizeStr(name))) return null;
  }

  return userFavoriteAvatarThemeSchema.create({
    userId,
    name: name.trim(),
    skinId,
    backgroundId,
    metalness,
    avatarColor,
    wireframeColor,
    isFlatshading,
  });
};

/**
 * delete user favorite avatar theme by theme id
 * @param {int} id
 */
const deleteUserFavoriteAvatarTheme = async (id) => {
  const [result] = await userFavoriteAvatarThemeSchema.update(
    { delmk: 1 },
    { where: { id } },
  );

  return result;
};

/**
 * get all avatar skins data
 */
const getAllAvatarSkins = async () => avatarSkinSchema.findAll();

/**
 * get avatar skin record by skin file name
 * @param {string} name - avatar skin file name
 */
const getAvatarSkinByName = async (name) => {
  if (!name) return null;
  const cacheValue = cache.get(`getAvatarSkinByName ${name}`);

  if (cacheValue) return cacheValue;
  const avatarSkin = await avatarSkinSchema.findOne({
    where: { name },
    raw: true,
  });

  cache.set(`getAvatarSkinByName ${name}`, avatarSkin);
  return avatarSkin;
};

/**
 * get avatar skin record by skin id
 * @param {int} id - avatar skin id
 */
const getAvatarSkinById = async (id) => {
  return avatarSkinSchema.findOne({
    where: { id },
  });
};

/**
 * create new avatar skin record with a given name
 * @param {string} name
 */
const createAvatarSkin = async (name) =>
  avatarSkinSchema.create({
    name,
  });

/**
 * delete an existing avatar skin record with a given id
 * @param {int} id
 */
const deleteAvatarSkin = async (id) => {
  const result = await avatarSkinSchema.destroy({
    where: {
      id,
    },
  });

  return result;
};

/**
 * get all avatar background data
 */
const getAllAvatarBackgrounds = async () => avatarBackgroundSchema.findAll();

/**
 * get avatar background record by background file name
 * @param {string} name - avatar background file name
 */
const getAvatarBackgroundByName = async (name) => {
  if (!name) return null;
  const cacheValue = cache.get(`getAvatarBackgroundByName ${name}`);

  if (cacheValue) return cacheValue;
  const avatarBackground = await avatarBackgroundSchema.findOne({
    where: { name },
    raw: true,
  });

  cache.set(`getAvatarBackgroundByName ${name}`, avatarBackground);
  return avatarBackground;
};

/**
 * get avatar background record by background id
 * @param {int} id - avatar background id
 */
const getAvatarBackgroundById = async (id) =>
  avatarBackgroundSchema.findOne({
    where: { id },
  });

/**
 * create new avatar background record with a given name
 * @param {string} name
 */
const createAvatarBackground = async (name) =>
  avatarBackgroundSchema.create({
    name,
  });

/**
 * delete an existing avatar background record with a given id
 * @param {int} id
 */
const deleteAvatarBackground = async (id) => {
  const result = await avatarBackgroundSchema.destroy({
    where: {
      id,
    },
  });

  return result;
};

export {
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
};
