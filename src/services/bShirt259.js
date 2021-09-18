import { bShirt259Schema } from 'models';
import { cache } from 'utils/cache';
import logger from 'utils/logger';

const nameSpace = 'services/fabryque/bShirt259';
const getBShirt259ByCondition = async (where) => {
  if (!where) {
    logger.info(`${nameSpace} :getBShirt259ByCondition=> no condition`);
    return {};
  }

  const cacheValue = cache.get(
    `getBShirt259ByCondition ${JSON.stringify(where)}`,
  );

  if (cacheValue) return cacheValue;
  const bShirt259 = await bShirt259Schema.findOne({
    where, // dynamic condition
    raw: true,
  });

  cache.set(`getBShirt259ByCondition ${JSON.stringify(where)}`, bShirt259);
  return bShirt259;
};

const findOrCreateShirt259 = async (data) => {
  const where = {
    fit: data.fit,
    neckEase: data.neckEase,
    length: data.length,
    lengthCustom: data.lengthCustom || null,
    sideSeamCurviness: data.sideSeamCurviness,
    sideSeamCurvinessCustom: data.sideSeamCurvinessCustom || null,
    yoke: data.yoke,
    yokeBack: data.yokeBack,
    yokeDepth: data.yokeDepth,
    yokeFabric: data.yokeFabric,
    backHem: data.backHem,
    frontHem: data.frontHem,
    placket: data.placket,
    placketWidth: data.placketWidth,
    placketSewingExt: data.placketSewingExt,
    buttonPlacket: data.buttonPlacket,
    buttonPlacketWidth: data.buttonPlacketWidth,
    firstButtonPlacementLength: data.firstButtonPlacementLength,
    collarBandConstruction: data.collarBandConstruction,
    collarBandShape: data.collarBandShape,
    collarBandFabric: data.collarBandFabric,
    collarBandContrast: data.collarBandContrast || null,
    collar: data.collar,
    collarType: data.collarType,
    collarBandTypeCustom: data.collarBandTypeCustom || null,
    collarBandHeight: data.collarBandHeight || null,
    collarHeightDiff: data.collarHeightDiff || null,
    collarPointLength: data.collarPointLength || null,
    collarFabric: data.collarFabric || null,
    collarFabricContrastSide: data.collarFabricContrastSide || null,
    collarStay: data.collarStay || null,
    pocket: data.pocket,
    sleeveType: data.sleeveType,
    sleevePlacket: data.sleevePlacket,
    sleevePlacketType: data.sleevePlacketType,
    sleevePlacketWidth: data.sleevePlacketWidth,
    sleevePleat: data.sleevePleat,
    sleevePleatBack: data.sleevePleatBack,
    sleevePleatFront: data.sleevePleatFront || null,
    cuff: data.cuff,
    cuffStyle: data.cuffStyle,
    cuffHeight: data.cuffHeight,
    cuffEase: data.cuffEase,
    cuffFabric: data.cuffFabric,
    cuffFabricContrast: data.cuffFabricContrast || null,
  };
  const [item, created] = await bShirt259Schema.findOrCreate({
    where,
    defaults: data,
  });

  logger.info(`${nameSpace} :findOrCreateShirt259=> ${created}`);
  return item.get({ plain: true });
};

export { findOrCreateShirt259, getBShirt259ByCondition };
