import { Connection } from "mongoose";
export const cleanupConnection = async (connection: Connection): Promise<void> => {
  await connection.dropDatabase();
  await connection.destroy();
};
