import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Comment, CommentMetaData } from "../../../feature/announcements/domain/comment.entity";
import { CommentRepo } from "../../../feature/announcements/repos/Comment.repo";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoCommentRepo extends MongoBaseRepo<CommentMetaData> implements CommentRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "comment", session);
  }

  async getCommentsOfPosts(postIds: string[]): Promise<Populate<CommentMetaData, "user">[]> {
    const data = (await this.model
      .find({ post: { $in: postIds }, isReply: false })
      .populate("user")
      .sort("-publishedAt")) as unknown as Populate<CommentMetaData, "user">[];

    return data;
  }

  async getRepliesOfPosts(postIds: string[]): Promise<Populate<CommentMetaData, "user">[]> {
    const data = (await this.model
      .find({ post: { $in: postIds }, isReply: true })
      .populate("user")
      .sort("-publishedAt")) as unknown as Populate<CommentMetaData, "user">[];

    return data;
  }

  async getRepliesOfComments(commentIds: ID[]): Promise<Populate<CommentMetaData, "user">[]> {
    const data = (await this.model
      .find({ parentComment: { $in: commentIds }, isReply: true })
      .populate("user")
      .sort("-publishedAt")) as unknown as Populate<CommentMetaData, "user">[];

    return data;
  }

  async listCommentsOfPost(
    postId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<CommentMetaData, "user">>> {
    const data = await this.findManyWithPagination(
      {
        post: postId,
        isReply: false,
      },
      { ...options, populate: ["user"], sort: { publishedAt: -1 } },
    );

    return data;
  }

  async listRepliesOfComment(
    commentId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<CommentMetaData, "user">>> {
    const data = await this.findManyWithPagination(
      {
        parentComment: commentId,
        isReply: true,
      },
      { ...options, populate: ["user"], sort: { publishedAt: -1 } },
    );

    return data;
  }

  async getAllCommentsAndRepliesOfPosts(postId: ID): Promise<Comment[]> {
    const data = await this.model.find({ post: postId });

    return data;
  }
}
