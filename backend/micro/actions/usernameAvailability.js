import config from '@shared/config/index.js';
import { USERNAME_TAKEN } from '@shared/consts/NOTIFICATIONS.js';
import { sleep } from '@shared/utils/index.js';

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
