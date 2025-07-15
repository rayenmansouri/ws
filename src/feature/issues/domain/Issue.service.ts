import { TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { Issue } from "./issue.entity";

export class IssueService {
  static isIssueSeenByUser(
    participantViewStatuses: Issue["participantViewStatuses"],
    userType: TEndUserEnum,
  ): boolean {
    const lastUserSeenHistory = participantViewStatuses.find(
      seen => seen.participantType === userType,
    ) as Issue["participantViewStatuses"][0];

    return lastUserSeenHistory.isSeen;
  }

  static isUserAllowedToViewIssue(
    userDetails: {
      userType: TEndUserEnum;
      userId: ID;
    },
    issue: { author: ID; teacher: ID | null; isForwarded: boolean },
  ): boolean {
    if (userDetails.userType === "admin") return true;

    if (userDetails.userType === "parent" && issue.author === userDetails.userId) return true;

    if (
      userDetails.userType === "teacher" &&
      issue.teacher === userDetails.userId &&
      issue.isForwarded
    )
      return true;

    return false;
  }

  static updateParticipantViewStatuses(
    participantViewStatuses: Issue["participantViewStatuses"],
    viewingUserType: TEndUserEnum,
  ): Issue["participantViewStatuses"] {
    return participantViewStatuses.map(participantViewStatus => {
      if (participantViewStatus.participantType === viewingUserType) {
        return { ...participantViewStatus, isSeen: true };
      }
      return { ...participantViewStatus, isSeen: false };
    });
  }
}
