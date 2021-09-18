import { getBShirt259ByCondition } from '../bShirt259';

describe('shirt259 model api', () => {
  describe('shirt259 model1', () => {
    test('shirt259 works', async () => {
      const result = await getBShirt259ByCondition();

      expect(result).toEqual({});
    });
  });
});
