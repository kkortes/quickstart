import { USERNAME_TAKEN } from '../universal/NOTIFICATIONS.js';
import config from '../config/index.js';
import { sleep } from '../universal/helpers.js';

export default async ({ username }, mongo) => {
  if (config.debug) {
    await sleep(1000);
  }
  const collection = mongo.db(config.dbName).collection('state');

  const LCusername = username.toLowerCase();

  const user = await collection.findOne({
    username: LCusername,
  });

  return user ? USERNAME_TAKEN : { username: LCusername };
};
