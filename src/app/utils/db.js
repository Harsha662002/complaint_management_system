import { MongoClient } from "mongodb";

let client;

export async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(process.env.MONGO);
  }
  return client;
}
