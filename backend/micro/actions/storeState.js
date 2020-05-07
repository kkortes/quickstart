export default async (body, mongo) => {
  const collection = mongo.db('test').collection('state');

  const update = await collection.update(
    { _id: body.id },
    { $set: body.update },
    { upsert: true }
  );

  if (update.result.ok) {
    return {};
  }
  return { error: 'Could not store progress' };
};
