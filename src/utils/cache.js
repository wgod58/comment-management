import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3 });

export { cache };
