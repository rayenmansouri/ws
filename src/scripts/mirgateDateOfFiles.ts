import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { container } from "../core/container/container";

export const migrateForPartialPayment = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = (await schoolRepo.findAll({})).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );
  if (schools.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of schools) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    console.log("🚀 Working on", connection.name);

    initializeModels(connection, tenantSchemas);

    // comments + attachments
    const commentsWithAttachments = await crudRepo(connection, "comment").findMany({
      $expr: {
        $gt: [{ $size: "$attachments" }, 0],
      },
    });
    console.log("working on comments with attachments", commentsWithAttachments.length);
    for (const comment of commentsWithAttachments) {
      await crudRepo(connection, "comment").updateOne(
        { _id: comment._id },
        {
          attachments: comment.attachments.map(attachment => {
            return {
              ...attachment,
              date: new Date(attachment.date),
            };
          }),
        },
      );
    }

    // comments + media
    const commentWithMedia = await crudRepo(connection, "comment").findMany({
      $expr: {
        $gt: [{ $size: "$media" }, 0],
      },
    });
    console.log("working on comments with media", commentWithMedia.length);
    for (const comment of commentWithMedia) {
      await crudRepo(connection, "comment").updateOne(
        { _id: comment._id },
        {
          media: comment.media.map(media => {
            return {
              ...media,
              date: new Date(media.date),
            };
          }),
        },
      );
    }

    // posts + attachments
    const postsWithAttachments = await crudRepo(connection, "post").findMany({
      $expr: {
        $gt: [{ $size: "$attachments" }, 0],
      },
    });
    console.log("working on posts with attachments", postsWithAttachments.length);
    for (const post of postsWithAttachments) {
      await crudRepo(connection, "post").updateOne(
        { _id: post._id },
        {
          attachments: post.attachments.map(attachment => {
            return {
              ...attachment,
              date: new Date(attachment.date),
            };
          }),
        },
      );
    }

    // posts + media
    const postsWithMedia = await crudRepo(connection, "post").findMany({
      $expr: {
        $gt: [{ $size: "$media" }, 0],
      },
    });
    console.log("working on posts with media", postsWithMedia.length);
    for (const post of postsWithMedia) {
      await crudRepo(connection, "post").updateOne(
        { _id: post._id },
        {
          media: post.media.map(media => {
            return {
              ...media,
              date: new Date(media.date),
            };
          }),
        },
      );
    }

    // interactions + documents
    const interactionsWithDocuments = await crudRepo(connection, "interaction").findMany({
      $expr: {
        $gt: [
          {
            $size: {
              $ifNull: ["$content.documents", []],
            },
          },
          0,
        ],
      },
    });
    console.log("working on interactions with documents", interactionsWithDocuments.length);
    for (const interaction of interactionsWithDocuments) {
      await crudRepo(connection, "interaction").updateOne(
        { _id: interaction._id },
        {
          "content.documents": interaction.content?.documents.map(document => {
            return {
              ...document,
              date: new Date(document.date),
            };
          }),
        },
      );
    }

    // interactions + media
    const interactionsWithMedia = await crudRepo(connection, "interaction").findMany({
      $expr: {
        $gt: [
          {
            $size: {
              $ifNull: ["$content.media", []],
            },
          },
          0,
        ],
      },
    });
    console.log("working on interactions with media", interactionsWithMedia.length);
    for (const interaction of interactionsWithMedia) {
      await crudRepo(connection, "interaction").updateOne(
        { _id: interaction._id },
        {
          "content.media": interaction.content?.media.map(media => {
            return {
              ...media,
              date: new Date(media.date),
            };
          }),
        },
      );
    }

    // issue + documents
    const issuesWithDocuments = await crudRepo(connection, "issue").findMany({
      $expr: {
        $gt: [
          {
            $size: {
              $ifNull: ["$content.documents", []],
            },
          },
          0,
        ],
      },
    });
    console.log("working on issues with documents", issuesWithDocuments.length);
    for (const issue of issuesWithDocuments) {
      await crudRepo(connection, "issue").updateOne(
        { _id: issue._id },
        {
          "content.documents": issue.content?.documents.map(document => {
            return {
              ...document,
              date: new Date(document.date),
            };
          }),
        },
      );
    }

    // issue + media
    const issuesWithMedia = await crudRepo(connection, "issue").findMany({
      $expr: {
        $gt: [
          {
            $size: {
              $ifNull: ["$content.media", []],
            },
          },
          0,
        ],
      },
    });
    console.log("working on issues with media", issuesWithMedia.length);
    for (const issue of issuesWithMedia) {
      await crudRepo(connection, "issue").updateOne(
        { _id: issue._id },
        {
          "content.media": issue.content?.media.map(media => {
            return {
              ...media,
              date: new Date(media.date),
            };
          }),
        },
      );
    }

    // session + files
    const sessionsWithFiles = await crudRepo(connection, "session").findMany({
      $expr: {
        $gt: [{ $size: "$files" }, 0],
      },
    });
    console.log("working on sessions with files", sessionsWithFiles.length);
    for (const session of sessionsWithFiles) {
      await crudRepo(connection, "session").updateOne(
        { _id: session._id },
        {
          files: session.files.map(file => {
            return {
              ...file,
              date: new Date(file.date),
            };
          }),
        },
      );
    }
  }
};
dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await migrateForPartialPayment();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
