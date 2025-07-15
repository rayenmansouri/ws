import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { Transaction } from "../../../feature/transactions/transaction.entity";
import { cleanupConnection } from "../../../helpers/test/cleanupConnection";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { ID } from "../../../types/BaseEntity";
import { mongoTransactionSchema } from "../schemas/transaction.schema";
import { MongoTransactionRepo } from "./MongoTransaction.repo";

describe("Mongo parent repo", () => {
  let connection: Connection;
  let transactionModel: Model<Transaction>;
  let transactionRepo: MongoTransactionRepo;
  // let supplierModel: Model<Supplier>;
  // let supplierRepo: MongoSupplierRepo;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    transactionModel = connection.model<Transaction>("transaction", mongoTransactionSchema);
    // supplierModel = connection.model<Supplier>("supplier", mongoSupplierSchema);
  });

  afterAll(async () => {
    await cleanupConnection(connection);
  });

  beforeEach(() => {
    transactionRepo = new MongoTransactionRepo(connection, null);
    //  supplierRepo = new MongoSupplierRepo(connection, null);
  });

  describe("getTransactionsBySuppliers", () => {
    it("Should Get Transaction By Suppliers IDs", async () => {
      const supplerId1 = faker.database.mongodbObjectId() as ID;
      const supplerId2 = faker.database.mongodbObjectId() as ID;

      const transaction1 = (await transactionModel.create({ supplier: null })).toObject();
      const transaction2 = (await transactionModel.create({ supplier: supplerId1 })).toObject();
      const transaction3 = (await transactionModel.create({ supplier: supplerId2 })).toObject();

      const transactions = await transactionRepo.getTransactionsBySuppliers([
        supplerId1,
        supplerId2,
      ]);

      expect(transactions).toEqual([transaction2, transaction3]);
      expect(transactions).not.toContainEqual([transaction1]);
    });
  });
});
