import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

if (!dbName) {
  throw new Error("DB_NAME is missing from .env.local");
}

const globalForMongo = globalThis;

const clientPromise =
  globalForMongo.mongoClientPromise ||
  new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClientPromise = clientPromise;
}

export async function getMongoClient() {
  return clientPromise;
}

export async function getMongoDB() {
  const client = await getMongoClient();
  return client.db(dbName);
}