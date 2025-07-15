import { FileMapper } from "./../../../core/fileManager/file.mapper";
import { Populate } from "../../../core/populateTypes";
import { UserMapper } from "../../users/mappers/User.mapper";
import { InteractionMetaData } from "../domain/interaction.entity";
import { InteractionDTO } from "../dtos/interaction.dto";

export class InteractionMapper {
  static toInteractionDTO(
    interaction: Populate<InteractionMetaData, "actor" | "sender" | "target">,
  ): InteractionDTO {
    return {
      _id: interaction._id,
      newId: interaction.newId,
      action: interaction.action,
      actor: interaction.actor ? UserMapper.toUserProfileDTO(interaction.actor) : null,
      content: {
        ...interaction.content,
        documents:
          interaction.content?.documents.map(document => FileMapper.toFileDTO(document)) ?? [],
        media: interaction.content?.media.map(attachment => FileMapper.toFileDTO(attachment)) ?? [],
      },
      sender: interaction.sender ? UserMapper.toUserProfileDTO(interaction.sender) : null,
      sentAt: interaction.sentAt,
      target: interaction.target ? UserMapper.toUserProfileDTO(interaction.target) : null,
      type: interaction.interactionType,
    };
  }
}
