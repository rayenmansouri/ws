/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable no-console */
import dotenv from "dotenv";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { NotFoundError } from "../core/ApplicationErrors";
import { container } from "../core/container/container";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");

  const tenantsDocs = await schoolRepo.findAll();
  mongoose.set("strictPopulate", false);
  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    console.log("WORKING ON", schoolSubdomain);
    const connection = await getNewTenantConnection(schoolSubdomain);

    try {
      const classGroups = await connection.model("classGroup").find();

      if (classGroups.length === 0) {
        const groupes = await connection.model("group").find();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await crudRepo(connection, "classGroup").addMany(groupes);
      }

      const groupCounter = await crudRepo(connection, "counter").findOne({
        collectionName: "groups",
      });

      if (!groupCounter) throw new Error("Counter doest not exists");

      const classGroupCounter = await crudRepo(connection, "counter").findOne({
        collectionName: "classgroups",
      });

      if (!classGroupCounter) {
        await crudRepo(connection, "counter").addOne({
          collectionName: "classgroups",
          count: groupCounter.count,
        });
      } else {
        const classGroupCount = classGroupCounter.count;
        const groupCount = groupCounter.count;

        if (groupCount > classGroupCount) {
          await crudRepo(connection, "counter").updateOne(
            { collectionName: "classgroups" },
            { $set: { count: groupCount } },
          );
        }
      }
    } catch (error) {
      console.log((error as MongoServerError).message);
    }

    const classes = await connection
      .model("class")
      .find({ groups: { $exists: true }, classGroups: { $exists: false } });
    const homeworks = await connection
      .model("homework")
      .find({ group: { $exists: true }, classGroup: { $exists: false } });
    const studentProfiles = await connection
      .model("studentProfile")
      .find({ group: { $exists: true }, classGroup: { $exists: false } });
    const sessions = await connection
      .model("session")
      .find({ group: { $exists: true }, classGroup: { $exists: false } });
    const weeklySessions = await connection
      .model("weeklySession")
      .find({ group: { $exists: true }, classGroup: { $exists: false } });

    const newClasses = classes.map((classDoc: any) => {
      if (classDoc.classGroups === undefined && classDoc.groups) {
        return { ...classDoc, classGroups: classDoc.groups };
      }

      return classDoc;
    });

    const newHomeworks = homeworks.map((homeworkDoc: any) => {
      if (homeworkDoc.classGroup === undefined && homeworkDoc.group) {
        return { ...homeworkDoc, classGroup: homeworkDoc.group };
      }

      return homeworkDoc;
    });

    const newStudentProfiles = studentProfiles.map((studentProfileDoc: any) => {
      if (studentProfileDoc.classGroup === undefined && studentProfileDoc.group) {
        return { ...studentProfileDoc, classGroup: studentProfileDoc.group };
      }
      return studentProfileDoc;
    });

    const newSession = sessions.map((sessionDoc: any) => {
      if (sessionDoc.classGroup === undefined && sessionDoc.group) {
        return { ...sessionDoc, classGroup: sessionDoc.group };
      }
      return sessionDoc;
    });

    const newWeeklySessions = weeklySessions.map((weeklySessionDoc: any) => {
      if (weeklySessionDoc.classGroup === undefined && weeklySessionDoc.group) {
        return { ...weeklySessionDoc, classGroup: weeklySessionDoc.group };
      }
      return weeklySessionDoc;
    });

    await Promise.all([
      ...newClasses.map(classDoc =>
        connection
          .model("class")
          .findByIdAndUpdate(classDoc._id, { $set: { classGroups: classDoc.classGroups } }),
      ),
      ...newHomeworks.map(homwork =>
        connection
          .model("homework")
          .findByIdAndUpdate(homwork._id, { $set: { classGroup: homwork.classGroup } }),
      ),
      ...newStudentProfiles.map(studentProfile =>
        connection.model("studentProfile").findByIdAndUpdate(studentProfile._id, {
          $set: { classGroup: studentProfile.classGroup },
        }),
      ),
      ...newSession.map(sessionDoc =>
        connection.model("session").findByIdAndUpdate(sessionDoc._id, {
          $set: { classGroup: sessionDoc.classGroup },
        }),
      ),
      ...newWeeklySessions.map(weeklySessionDoc =>
        connection.model("weeklySession").findByIdAndUpdate(weeklySessionDoc._id, {
          $set: { classGroup: weeklySessionDoc.classGroup },
        }),
      ),
    ]);
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
