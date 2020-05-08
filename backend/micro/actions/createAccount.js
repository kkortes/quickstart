import { ACCOUNT_EXISTS } from '../../../universal/NOTIFICATIONS.js';
import config from '../../../config/index.js';

export default async ({ email, password }, mongo) => {
  const collection = mongo.db(config.dbName).collection('account');

  const LCemail = email.toLowerCase();

  const acccount = await collection.findOne({
    email: LCemail,
  });

  if (acccount) {
    return ACCOUNT_EXISTS;
  } else {
    await collection.insertOne({
      email: LCemail,
      password,
      created: new Date().getTime(),
    });

    return {};
  }
};
