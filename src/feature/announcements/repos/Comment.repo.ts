import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Comment, CommentMetaData } from "../domain/comment.entity";

export abstract class CommentRepo extends BaseRepo<CommentMetaData> {
  abstract getCommentsOfPosts(postIds: ID[]): Promise<Populate<CommentMetaData, "user">[]>;

  abstract getRepliesOfPosts(postIds: ID[]): Promise<Populate<CommentMetaData, "user">[]>;

  abstract getRepliesOfComments(commentIds: ID[]): Promise<Populate<CommentMetaData, "user">[]>;

  abstract listCommentsOfPost(
    postId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<CommentMetaData, "user">>>;

  abstract listRepliesOfComment(
    commentId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<CommentMetaData, "user">>>;

  abstract getAllCommentsAndRepliesOfPosts(postId: ID): Promise<Comment[]>;
}
