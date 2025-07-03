import dotenv from "dotenv";
import mongoose, { ObjectId } from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { populateInterface } from "../database/types";
import { IPost } from "../database/schema/announcement/post.schema";
import { IUser } from "../types/entities";
import { IComment } from "../database/schema/announcement/comment.schema";

export const script = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = await schoolRepo.findAll();

  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);
    initializeModels(connection, tenantSchemas);

    console.log("🚀 ~ Working on", connection.name);

    const allPosts = (await crudRepo(connection, "post").findMany(
      {},
      { populate: ["author"] },
      //@ts-ignore
    )) as unknown as populateInterface<IPost, { author: IUser | null }>[];

    const allComments = (await crudRepo(connection, "comment").findMany(
      {},
      { populate: ["user"] },
      //@ts-ignore
    )) as unknown as populateInterface<IComment, { user: IUser | null }>[];

    const deletePostIds: ObjectId[] = [];
    const deleteCommentIds: ObjectId[] = [];

    allPosts.forEach(post => {
      if (!post.author) {
        deletePostIds.push(post._id);
      }
    });

    allComments.forEach(comment => {
      if (!comment.user) {
        deleteCommentIds.push(comment._id);
      }
    });

    console.log(
      "Found",
      deletePostIds.length,
      "posts and",
      deleteCommentIds.length,
      "comments to delete",
    );

    await crudRepo(connection, "feed").updateMany(
      { posts: { $in: deletePostIds } },
      { $pull: { posts: { $in: deletePostIds } } },
    );
    await crudRepo(connection, "post").hardDeleteMany({ _id: { $in: deletePostIds } });
    await crudRepo(connection, "comment").hardDeleteMany({ _id: { $in: deleteCommentIds } });

    console.log("🚀 ~ Finish", connection.name);
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await script();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
