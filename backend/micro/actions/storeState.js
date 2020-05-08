import { NETWORK_ERROR } from '../../../universal/NOTIFICATIONS.js';
import config from '../../../config/index.js';

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
