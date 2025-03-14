
import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bus-booking";
let db: Db;

export const connectDB = async () => {
  if (db) return db;
  
  const client = await MongoClient.connect(MONGODB_URI);
  db = client.db();
  return db;
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};
