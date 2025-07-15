import { FileMapper } from "./../../../core/fileManager/file.mapper";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { Populate } from "../../../core/populateTypes";
import { Class } from "../../classes/domain/class.entity";
import { Student } from "../../students/domain/student.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { InteractionMetaData } from "../domain/interaction.entity";
import { IssueMetaData } from "../domain/issue.entity";
import { IssueService } from "../domain/Issue.service";
import { IssueDTO } from "../dtos/issue.dto";
import { InteractionMapper } from "./Interaction.mapper";
import { IssueReasonMapper } from "./IssueReason.mapper";

type ToIssueDTOParams = {
  issue: Populate<IssueMetaData, "author" | "teacher" | "studentProfile" | "reason">;
  student: Student;
  classDoc: Class | null;
  userType: TEndUserEnum;
  lastInteraction: Populate<InteractionMetaData, "actor" | "sender" | "target"> | null;
};

export class IssueMapper {
  static toIssueDTO({
    issue,
    student,
    classDoc,
    userType,
    lastInteraction,
  }: ToIssueDTOParams): IssueDTO {
    return {
      _id: issue._id,
      newId: issue.newId,
      author: UserMapper.toUserProfileDTO(issue.author),
      lastSender:
        userType === END_USER_ENUM.PARENT
          ? UserMapper.toUserProfileDTO(
              lastInteraction?.sender || lastInteraction?.actor || issue.author,
            )
          : UserMapper.toUserProfileDTO(issue.author),
      content: {
        ...issue.content,
        documents: issue.content.documents.map(file => FileMapper.toFileDTO(file)),
        media: issue.content.media.map(file => FileMapper.toFileDTO(file)),
      },
      isForwarded: issue.isForwarded,
      teacher: issue.teacher ? UserMapper.toUserProfileDTO(issue.teacher) : null,
      student: UserMapper.toUserProfileDTO(student),
      reason: IssueReasonMapper.toIssueReasonDTO(issue.reason),
      sentAt: issue.sentAt,
      status: issue.status,
      targetType: issue.targetType,
      isSeen: IssueService.isIssueSeenByUser(issue.participantViewStatuses, userType),
      className: classDoc ? classDoc.name : null,
      lastInteraction: lastInteraction ? InteractionMapper.toInteractionDTO(lastInteraction) : null,
    };
  }
}
