import { tenantSchemas } from "./../../core/initializeModels";
import { faker } from "@faker-js/faker";
import mongoose, { Connection } from "mongoose";
import { initializeModels } from "../../core/initializeModels";
import { initializeNewID } from "../../core/newId/addNewId";
import { schoolDocStore } from "../../core/subdomainStore";
import { connectionPools } from "../../database/connectionDB/tenantPoolConnection";
import { MONGO_URI } from "./mongoMemoryServer";
import { stringToObjectId } from "../stringToObjectId";
import { School } from "../../feature/schools/domain/school.entity";

export type SchoolDetails = {
  subdomain: string;
  id: string;
  connection: Connection;
  maxStudentSeats: number;
  taxRate: number;
};

export const createRandomSchoolConnection = async (): Promise<SchoolDetails> => {
  const schoolDetails = {} as SchoolDetails;

  schoolDetails.subdomain = faker.finance.pin(8);
  schoolDetails.id = faker.database.mongodbObjectId();
  schoolDetails.taxRate = 19;
  schoolDetails.connection = await createSchoolConnection(
    schoolDetails.subdomain,
    schoolDetails.id,
  );

  schoolDocStore[schoolDetails.id] = {
    subdomain: schoolDetails.subdomain,
    phoneNumber: `29${faker.string.numeric(6)}`,
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    name: faker.string.alpha(5),
    _id: faker.database.mongodbObjectId(),
    maxStudentSeats: 500,
    dueDate: 3,
    taxRate: 19,
  } as School;

  return schoolDetails;
};

export const createSchoolConnection = async (
  schoolSubdomain: string,
  schoolId: string,
): Promise<Connection> => {
  const connection = mongoose.createConnection(`${MONGO_URI}/${schoolSubdomain}`);
  schoolDocStore[schoolId] = {
    subdomain: schoolSubdomain,
    phoneNumber: `29${faker.string.numeric(6)}`,
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    maxStudentSeats: 500,
    taxRate: 19,
  } as School;
  connectionPools[schoolSubdomain] = connection;
  initializeModels(connection, tenantSchemas);
  await initializeNewID(connection);
  return connection;
};
