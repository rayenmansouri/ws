import { Populate } from "../../../core/populateTypes";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ObservationMetaData } from "../domain/observation.entity";
import { ObservationDTO } from "../dtos/observation.dto";
import { ObservationReasonMapper } from "./ObservationReason.mapper";

export class ObservationMapper {
  static toObservationDTO(
    observation: Populate<ObservationMetaData, "issuer" | "students">,
    topicName: string | null,
  ): ObservationDTO {
    return {
      _id: observation._id,
      newId: observation.newId,
      admin:
        observation.issuerType === "admin" ? UserMapper.toUserProfileDTO(observation.issuer) : null,
      teacher:
        observation.issuerType === "teacher"
          ? UserMapper.toUserProfileDTO(observation.issuer)
          : null,
      students: observation.students.map(student => UserMapper.toUserProfileDTO(student)),
      files: observation.files.map(file => ({
        name: file.name,
        public_id: file.path,
        date: file.uploadedAt,
        url: file.link,
        size: file.size,
        mimeType: file.mimeType,
      })),
      note: observation.note,
      reason: ObservationReasonMapper.toObservationReasonDTO(observation.observationReason),
      issueDate: observation.createdAt,
      topicName,
    };
  }
}
