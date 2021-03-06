import mongodb from 'mongodb';
import config from '@shared/config/index.js';
import { PASSWORD_INCORRECT } from '@shared/consts/NOTIFICATIONS.js';
import { sleep } from '@shared/utils/index.js';

const { ObjectID } = mongodb;

export default async ({ email, password, token }, mongo) => {
  if (config.debug) {
    await sleep(1000);
  }

  const collection = mongo.db(config.dbName).collection('account');

  const LCemail = (email || '').toLowerCase();

  const findQuery = token
    ? {
        _id: ObjectID(token),
      }
    : {
        email: LCemail,
        password,
      };

  const account = await collection.findOne(findQuery);

  if (account) {
    const token = account._id.toString();
    const stateCollection = mongo.db(config.dbName).collection('state');

    const accountData = await stateCollection.findOne({
      _id: token,
    });
    return {
      token,
      _id: token,
      ...(accountData || {}),
    };
  } else {
    return PASSWORD_INCORRECT;
  }
};
