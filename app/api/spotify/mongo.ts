import { MongoClient, ServerApiVersion } from 'mongodb';

let client: MongoClient | null = null;

export async function getClient() {
  if (!client) {
    const uri = process.env.MONGO_CONNECTION_STRING;
    if (!uri) {
      throw new Error('MONGO_CONNECTION_STRING is not defined');
    }
    client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    await client.connect();
  }
  return client;
}
