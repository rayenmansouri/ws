import { Populate } from "../../../core/populateTypes";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ReactionMetaData } from "../domain/reaction.entity";
import { ReactionsDTO } from "../dtos/reactions.dto";

export class ReactionsMapper {
  static toDTO(reaction: Populate<ReactionMetaData, "users.user">): ReactionsDTO {
    return reaction.users.map(user => ({
      reactionType: user.reactionType,
      reactedAt: user.reactedAt,
      user: {
        ...UserMapper.toUserProfileDTO(user.user),
        type: user.userType,
      },
    }));
  }
}
