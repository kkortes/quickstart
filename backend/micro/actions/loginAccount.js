import { PASSWORD_INCORRECT } from '../../../universal/NOTIFICATIONS.js';

export default async ({ email, password }, mongo) => {
  const collection = mongo.db('test').collection('users');

  const LCemail = email.toLowerCase();

  const user = await collection.findOne({
    email: LCemail,
    password,
  });

  if (user) {
    return {
      token: user._id.toString(),
    };
  } else {
    return PASSWORD_INCORRECT;
  }
};
