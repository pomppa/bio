import { getClient } from './mongo'
import { ObjectId } from 'mongodb';

export async function getKeys() {
  const client = await getClient();

  const db = client.db(process.env.MONGO_DB_NAME);

  const keys = await db.collection("spotify").findOne({
    _id: new ObjectId(process.env.MONGO_OBJECT_ID),
  });

  return keys;
}

export async function postKeys(data) {
  const client = await getClient();

  const db = client.db(process.env.MONGO_DB_NAME);

  const res = await db
    .collection("spotify")
    .updateOne(
      { _id: new ObjectId(process.env.MONGO_OBJECT_ID) },
      { $set: data }
    );

  return res;
}
