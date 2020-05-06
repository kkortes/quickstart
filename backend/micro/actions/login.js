export default async ({ email, password }, mongo) => {
  const collection = mongo.db('test').collection('users');

  const LCemail = email.toLowerCase();

  const user = await collection.findOne({
    email: LCemail,
    password,
  });

  if (user) {
    return {
      id: user._id,
    };
  } else {
    return {
      error: 'Incorrect password',
    };
  }
};
