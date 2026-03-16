import { connect } from "mongoose";

const mongo_Url = process.env.MONGO_URI;

if (!mongo_Url) {
  console.log("MongoDB URL not found");
  throw new Error("MongoDB URL not found");
}

let cache = globalThis.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = connect(mongo_Url!).then((c) => c.connection);
  }

  try {
    cache.conn = await cache.promise;
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
    throw new Error(`database connection error ${error}`);
  }

  return cache.conn;
};

export default connectDb;
