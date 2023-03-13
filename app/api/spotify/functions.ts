import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const uri = process.env.MONGO_CONNECTION_STRING as string;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

client.connect();

// todo objectid workaround
export async function getKeys() {
  const db = client.db(process.env.MONGO_DB_NAME);

  const keys = await db.collection("spotify").findOne({
    _id: new ObjectId(process.env.MONGO_OBJECT_ID),
  });

  return keys;
}

export async function postKeys(data) {
  const db = client.db(process.env.MONGO_DB_NAME);

  const res = await db
    .collection("spotify")
    .updateOne(
      { _id: new ObjectId(process.env.MONGO_OBJECT_ID) },
      { $set: data }
    );

  return res;
}
