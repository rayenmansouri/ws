import mongoose, { Connection } from "mongoose";
import { auth_db, database_secret } from "../../config";
import { RandomUtils } from "../RandomUtils";

export const MONGO_URI = `mongodb://127.0.0.1:12345`;
export const MONGO_URI_MASTER = `${MONGO_URI}/master`;
export const CENTRAL_URI = `${MONGO_URI}/central`;

export const connectToMongoMemoryServer = () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI_MASTER);

    //@ts-ignore
    database_secret = MONGO_URI;

    //@ts-ignore
    auth_db = "";
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export const connectToCentralMemoryServer = () => {
  beforeAll(async () => {
    await mongoose.connect(CENTRAL_URI);
    //@ts-ignore
    database_secret = MONGO_URI;

    //@ts-ignore
    auth_db = "";
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export const createRandomMongoConnection = (): Connection => {
  return mongoose.createConnection(`${MONGO_URI}/${RandomUtils.generateRandomNumber(8)}`);
};
