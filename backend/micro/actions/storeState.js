import config from '@shared/config/index.js';
import { NETWORK_ERROR } from '@shared/consts/NOTIFICATIONS.js';

export default async (body, mongo) => {
  const collection = mongo.db(config.dbName).collection('state');

  const update = await collection.update(
    { _id: body.id },
    { $set: body.update },
    { upsert: true }
  );

  if (update.result.ok) {
    return {};
  }
  return NETWORK_ERROR;
};
