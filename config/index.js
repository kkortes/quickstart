import development from './development.js';
import production from './production.js';
import { deepMerge } from '../universal/helpers.js';

const defaultConfig = {
  dbName: 'test',
};

export default deepMerge(
  defaultConfig,
  process.env.NODE_ENV === 'production' ? production : development
);
