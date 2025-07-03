/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { centralDBUri, masterDBUri } from "../config";
import { container } from "../core/container/container";
import { centralDatabaseConnection } from "../database/connectionDB/centralDBConnection";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { CentralUser } from "../feature/users/domain/centralUser.entity";
import { ID } from "../types/BaseEntity";
import { initializeModels, centralDBSchemas } from "../core/initializeModels";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = (await schoolRepo.findAll()).filter(school => school.subdomain === "oist");
  //@ts-ignore
  centralDatabaseConnection = mongoose.createConnection(centralDBUri);
  initializeModels(centralDatabaseConnection, centralDBSchemas);
  for (const school of schools) {
    const childContainer = container.createChild();
    const connection = await getTenantCon(school.subdomain);
    console.log("Working on", connection.name);
    childContainer.bind("Connection").toConstantValue(connection);

    const students = await crudRepo(connection, "student").findMany({});
    const admins = await crudRepo(connection, "admin").findMany({});
    const parents = await crudRepo(connection, "parent").findMany({});
    const teachers = await crudRepo(connection, "teacher").findMany({});

    const centralAdminUser: CentralUser[] = admins.map(user => {
      return {
        email: user.email || undefined,
        phoneNumber: user.phoneNumber || undefined,
        newId: `${school.newId}.${user.newId}`,
        userId: user._id as unknown as ID,
        tenantId: school._id,
      };
    });
    const centralStudentUser: CentralUser[] = students.map(user => {
      return {
        email: user.email || undefined,
        phoneNumber: user.phoneNumber || undefined,
        newId: `${school.newId}.${user.newId}`,
        userId: user._id as unknown as ID,
        tenantId: school._id,
      };
    });
    const centralTeacherUser: CentralUser[] = teachers.map(user => {
      return {
        email: user.email || undefined,
        phoneNumber: user.phoneNumber || undefined,
        newId: `${school.newId}.${user.newId}`,
        userId: user._id as unknown as ID,
        tenantId: school._id,
      };
    });
    const centralParentUser: CentralUser[] = parents.map(user => {
      return {
        email: user.email || undefined,
        phoneNumber: user.phoneNumber || undefined,
        newId: `${school.newId}.${user.newId}`,
        userId: user._id as unknown as ID,
        tenantId: school._id,
      };
    });

    const centralUserRepo = container.get("CentralUserRepo");

    const adminEmails = centralAdminUser
      .map(user => user.email)
      .filter(email => typeof email === "string");
    const studentEmails = centralStudentUser
      .map(user => user.email)
      .filter(email => typeof email === "string");
    const teacherEmails = centralTeacherUser
      .map(user => user.email)
      .filter(email => typeof email === "string");
    const parentEmails = centralParentUser
      .map(user => user.email)
      .filter(email => typeof email === "string");

    const adminPhoneNumbers = centralAdminUser
      .map(user => user.phoneNumber)
      .filter(phoneNumber => typeof phoneNumber === "string");
    const studentPhoneNumbers = centralStudentUser
      .map(user => user.phoneNumber)
      .filter(phoneNumber => typeof phoneNumber === "string");
    const teacherPhoneNumbers = centralTeacherUser
      .map(user => user.phoneNumber)
      .filter(phoneNumber => typeof phoneNumber === "string");
    const parentPhoneNumbers = centralParentUser
      .map(user => user.phoneNumber)
      .filter(phoneNumber => typeof phoneNumber === "string");

    console.log("CHECKING FOR DUPLICATES EMAIL OR PHONE NUMBER ...");
    await Promise.all([
      ...adminEmails.map(email => centralUserRepo.ensureEmailUniquenessOnAdd(email, "admin")),
      ...studentEmails.map(email => centralUserRepo.ensureEmailUniquenessOnAdd(email, "student")),
      ...teacherEmails.map(email => centralUserRepo.ensureEmailUniquenessOnAdd(email, "teacher")),
      ...parentEmails.map(email => centralUserRepo.ensureEmailUniquenessOnAdd(email, "parent")),
      ...adminPhoneNumbers.map(phoneNumber =>
        centralUserRepo.ensurePhoneUniquenessOnAdd(phoneNumber, "admin"),
      ),
      ...studentPhoneNumbers.map(phoneNumber =>
        centralUserRepo.ensurePhoneUniquenessOnAdd(phoneNumber, "student"),
      ),
      ...teacherPhoneNumbers.map(phoneNumber =>
        centralUserRepo.ensurePhoneUniquenessOnAdd(phoneNumber, "teacher"),
      ),
      ...parentPhoneNumbers.map(phoneNumber =>
        centralUserRepo.ensurePhoneUniquenessOnAdd(phoneNumber, "parent"),
      ),
    ]);

    console.log("ADMINI NUMBER TO INSERT " + centralAdminUser.length);
    console.log("STUDENT NUMBER TO INSERT " + centralStudentUser.length);
    console.log("TEACHER NUMBER TO INSERT " + centralTeacherUser.length);
    console.log("PARENT NUMBER TO INSERT " + centralParentUser.length);
    await centralUserRepo.addMany(centralAdminUser, "admin");
    await centralUserRepo.addMany(centralStudentUser, "student");
    await centralUserRepo.addMany(centralTeacherUser, "teacher");
    await centralUserRepo.addMany(centralParentUser, "parent");
    console.log(`Successfully migrated users for school: ${school.subdomain}`);
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await scripts();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
