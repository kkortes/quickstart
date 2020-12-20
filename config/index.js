import development from './development.js';
import production from './production.js';
import { deepMerge } from '../universal/helpers.js';

const defaultConfig = {
  dbName: 'quickstart',
};

export default deepMerge(
  defaultConfig,
  process.env.NODE_ENV === 'production' ? production : development
);
