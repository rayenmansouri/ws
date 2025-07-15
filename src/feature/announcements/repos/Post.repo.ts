import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { PostMetaData } from "../domain/post.entity";

export abstract class PostRepo extends BaseRepo<PostMetaData> {
  abstract findAllPinnedPosts(): Promise<
    Populate<PostMetaData, "author" | "classes" | "levels" | "groups">[]
  >;

  abstract findPinnedPostsByPostIds(
    postIds: ID[],
  ): Promise<Populate<PostMetaData, "author" | "classes" | "levels" | "groups">[]>;

  abstract listUnpinnedPosts(
    filter: {
      postIds?: ID[];
      hashTags?: string[];
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<PostMetaData, "author" | "classes" | "levels" | "groups">>
  >;

  abstract removeClass(classId: ID): Promise<void>;
  abstract removeGroup(classId: ID): Promise<void>;
}
