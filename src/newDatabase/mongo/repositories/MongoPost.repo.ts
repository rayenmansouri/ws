import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { Post, PostMetaData } from "../../../feature/announcements/domain/post.entity";
import { PostRepo } from "../../../feature/announcements/repos/Post.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoPostRepo extends MongoBaseRepo<PostMetaData> implements PostRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "post", session);
  }

  async findAllPinnedPosts(): Promise<
    Populate<PostMetaData, "author" | "classes" | "levels" | "groups">[]
  > {
    const pinnedPosts = (await this.model
      .find({ isPinned: true, isPublished: true })
      .populate("author classes levels groups")
      .sort("-publishedAt")) as unknown as Populate<
      PostMetaData,
      "author" | "classes" | "levels" | "groups"
    >[];

    return pinnedPosts;
  }

  async listUnpinnedPosts(
    filter: { postIds?: ID[]; hashTags?: string[] },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<PostMetaData, "author" | "classes" | "levels" | "groups">>
  > {
    const filterQuery: FilterQuery<Post> = {
      isPinned: false,
      isPublished: true,
    };

    if (filter.postIds) filterQuery._id = { $in: filter.postIds };

    if (filter.hashTags) filterQuery.hashTags = { $in: filter.hashTags };

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["author", "classes", "levels", "groups"],
      sort: {
        publishedAt: -1,
      },
    });

    return data;
  }

  async findPinnedPostsByPostIds(
    postIds: ID[],
  ): Promise<Populate<PostMetaData, "author" | "classes" | "levels" | "groups">[]> {
    const pinnedPosts = (await this.model
      .find({ _id: { $in: postIds }, isPinned: true, isPublished: true })
      .populate("author classes levels groups")
      .sort("-publishedAt")) as unknown as Populate<
      PostMetaData,
      "author" | "classes" | "levels" | "groups"
    >[];

    return pinnedPosts;
  }

  async removeClass(classId: ID): Promise<void> {
    await this.model.updateMany({ class: classId }, { $pull: { classes: classId } });
  }

  async removeGroup(groupId: ID): Promise<void> {
    await this.model.updateMany({ group: groupId }, { $pull: { groups: groupId } });
  }
}
