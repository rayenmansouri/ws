import "reflect-metadata";
import { Interaction } from "./../feature/issues/domain/interaction.entity";
import { Issue } from "./../feature/issues/domain/issue.entity";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { registerAllDependencies } from "../core/container/registerAllDependencies";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { FileDetails } from "./../core/fileManager/FileManager";
import { IFile } from "./../feature/sessionManagement/domain/session.entity";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");

  const schools = await schoolRepo.findAll();
  const tenantsDocs = schools;
  await initializeSubdomains();

  for (const tenantDoc of tenantsDocs) {
    const childContainer = container.createChild();

    const school = schoolDocStore[tenantDoc._id.toString()];
    const schoolSubdomain = school.subdomain;
    console.log("WORKING ON", schoolSubdomain);
    const connection = await getNewTenantConnection(schoolSubdomain);
    childContainer.bind("Connection").toConstantValue(connection);

    const issueModel = connection.model<Issue>("issue");

    const interactionModel = connection.model<Interaction>("interaction");

    const issues = await issueModel.find();
    const interactions = await interactionModel.find();

    // issue migrationmn
    for (const issue of issues) {
      console.log("issue : ", issue.newId);

      const newMedia: FileDetails[] = [];
      const newDocuments: FileDetails[] = [];
      if (issue.content.media && Array.isArray(issue.content.media))
        for (const attachment of issue.content.media) {
          const oldStructure: IFile = attachment as unknown as IFile;
          const newFileStructure: FileDetails = {
            name: oldStructure.name,
            link: oldStructure.url,
            path: oldStructure.public_id,
            uploadedAt: oldStructure.date,
            size: oldStructure.size,
            mimeType: oldStructure.mimeType,
          };

          newMedia.push(newFileStructure);
        }
      if (issue.content.documents && Array.isArray(issue.content.documents))
        for (const document of issue.content.documents) {
          const oldStructure: IFile = document as unknown as IFile;
          const newFileStructure: FileDetails = {
            name: oldStructure.name,
            link: oldStructure.url,
            path: oldStructure.public_id,
            uploadedAt: oldStructure.date,
            size: oldStructure.size,
            mimeType: oldStructure.mimeType,
          };

          newDocuments.push(newFileStructure);
        }

      await connection.model("issue").updateOne(
        { _id: issue._id },
        {
          $set: {
            ["content.media"]: newMedia,
          },
        },
      );
      await connection.model("issue").updateOne(
        { _id: issue._id },
        {
          $set: {
            ["content.documents"]: newDocuments,
          },
        },
      );
    }

    // interaction migration
    for (const interaction of interactions) {
      const newMedia: FileDetails[] = [];
      const newDocuments: FileDetails[] = [];
      console.log("interaction : ", interaction.newId);

      if (interaction.content) {
        if (interaction.content.media && Array.isArray(interaction.content.media))
          for (const attachment of interaction.content.media) {
            const oldStructure: IFile = attachment as unknown as IFile;
            const newFileStructure: FileDetails = {
              name: oldStructure.name,
              link: oldStructure.url,
              path: oldStructure.public_id,
              uploadedAt: oldStructure.date,
              size: oldStructure.size,
              mimeType: oldStructure.mimeType,
            };

            newMedia.push(newFileStructure);
          }
        if (interaction.content.documents && Array.isArray(interaction.content.documents))
          for (const document of interaction.content.documents) {
            const oldStructure: IFile = document as unknown as IFile;
            const newFileStructure: FileDetails = {
              name: oldStructure.name,
              link: oldStructure.url,
              path: oldStructure.public_id,
              uploadedAt: oldStructure.date,
              size: oldStructure.size,
              mimeType: oldStructure.mimeType,
            };

            newDocuments.push(newFileStructure);
          }

        await connection.model("interaction").updateOne(
          { _id: interaction._id },
          {
            $set: {
              ["content.media"]: newMedia,
            },
          },
        );
        await connection.model("interaction").updateOne(
          { _id: interaction._id },
          {
            $set: {
              ["content.documents"]: newDocuments,
            },
          },
        );
      }
    }
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    registerAllDependencies();
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
