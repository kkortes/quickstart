import { USER_EXISTS } from '../../../universal/NOTIFICATIONS.js';

export default async ({ email, password }, mongo) => {
  const collection = mongo.db('test').collection('users');

  const LCemail = email.toLowerCase();

  const user = await collection.findOne({
    email: LCemail,
  });

  if (user) {
    return USER_EXISTS;
  } else {
    await collection.insertOne({
      email: LCemail,
      password,
      created: new Date().getTime(),
    });

    return {};
  }
};
