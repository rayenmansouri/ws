import { Connection } from "mongoose";
import { TEndUserEnum } from "../../constants/globalEnums";

const authRepo = (connection: Connection, entity: TEndUserEnum) => {
  return {
    findByEmail: async (email: string) => {
      return await connection.model(entity).findOne({ email }).select("+password");
    },
    findByPhoneNumber: async (phoneNumber: string) => {
      return await connection.model(entity).findOne({ phoneNumber }).select("+password");
    },
    findById: async (id: string) => {
      return await connection.model(entity).findById(id).select("+password");
    },
    findByNewId: async (newId: string) => {
      return await connection.model(entity).findOne({ newId }).select("+password");
    },
  };
};

export default authRepo;
