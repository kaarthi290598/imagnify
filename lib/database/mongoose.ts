import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let catched: MongooseConnection = (global as any).mongoose;

if (!catched) {
  catched = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (catched.conn) return catched.conn;

  if (!MONGODB_URL) throw new Error("MONGODB_URL must be defined");

  catched.promise =
    catched.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "imagnify",
      bufferCommands: false,
    });

  catched.conn = await catched.promise;

  return catched.conn;
};
