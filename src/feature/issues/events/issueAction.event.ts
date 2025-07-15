import { END_USER_ENUM } from "../../../constants/globalEnums";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { IssueDTO } from "../dtos/issue.dto";
import { ID } from "./../../../types/BaseEntity";

export type TIssueActionPayload = IssueDTO;

export class IssueActionEvent extends BaseEvent {
  constructor(tenantId: string, payload: TIssueActionPayload) {
    super(tenantId, "ISSUE_ACTION", payload);
  }

  public sendEventToAdminsAndTeacher(userIds: Omit<TUserIdsEvent, "parentId">): void {
    const admins = userIds.adminIds.map(userId => ({
      id: userId,
      type: END_USER_ENUM.ADMIN,
    }));

    if (userIds.teacherId) {
      const teacher = {
        type: END_USER_ENUM.TEACHER,
        id: userIds.teacherId.toString(),
      };

      this.sendToUsers([...admins, teacher]);
      return;
    }

    this.sendToUsers(admins);
  }

  public sendEventToParent(parentId: ID): void {
    const parent = { type: END_USER_ENUM.PARENT, id: parentId };

    this.sendToUsers([parent]);
  }
}

type TUserIdsEvent = { parentId: ID; adminIds: ID[]; teacherId: ID | null };
