import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { School } from "../../schools/domain/school.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { PostMetaData } from "../domain/post.entity";
import { PostService } from "../domain/Post.service";
import { Reaction } from "../domain/reaction.entity";
import { ReactionService } from "../domain/Reactions.service";
import { CommentDTO } from "../dtos/comment.dto";
import { POST_POLICY_ENUM, PostDTO } from "../dtos/posts.dto";

type ToPostParams = {
  post: Populate<PostMetaData, "author" | "levels" | "classes" | "groups">;
  postReaction: Reaction;
  comments: CommentDTO[];
  school: School;
  userId: ID;
  includePublisher?: boolean;
};

export class PostMapper {
  private static MAX_NUMBER_OF_COMMENTS_PER_POST = 3;

  static toPostDTO({
    post,
    postReaction,
    comments,
    school,
    includePublisher,
    userId,
  }: ToPostParams): PostDTO {
    const base = {
      _id: post._id,
      newId: post.newId,
      // TODO: must remove the as and find a good way for entity variants
      publishedAt: post.publishedAt as Date,
      isPublic: post.isPublic,
      audience: PostService.getAudience(post),
      content: post.content,
      media: post.media,
      attachments: post.attachments,
      comments: comments.slice(0, this.MAX_NUMBER_OF_COMMENTS_PER_POST),
      commentsCount: comments.length,
      isCommentsAllowed: post.isCommentsAllowed,
      isPinned: post.isPinned,
      pinnedAt: post.pinnedAt,
      category: post.category,
      reactionSummary: ReactionService.getReactionSummary(postReaction),
      userReaction: ReactionService.getUserReaction(postReaction, userId),
      schoolName: school.name,
      schoolLogo: school.logo,
      policy: post.levels ? POST_POLICY_ENUM.CUSTOM : POST_POLICY_ENUM.ALL,
      levels: post.levels?.map(level => EntityMapper.toEntityDto(level)) || null,
      classes: post.classes?.map(classDoc => EntityMapper.toEntityDto(classDoc)) || null,
      groups: post.groups?.map(group => EntityMapper.toEntityDto(group)) || null,
      hashTags: post.hashTags,
      userTypes: post.userTypes,
    };

    if (includePublisher === true)
      return {
        ...base,
        publisher: UserMapper.toUserProfileDTO(post.author),
      };

    return {
      ...base,
      publisher: null,
    };
  }
}
