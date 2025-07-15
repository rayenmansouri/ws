import { END_USER_ENUM } from "../../../constants/globalEnums";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { IssueDTO } from "../dtos/issue.dto";
import { ID } from "./../../../types/BaseEntity";

export type TIssueCreatedEventPayload = IssueDTO;

export class IssueAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TIssueCreatedEventPayload) {
    super(tenantId, "ISSUE_ADDED_EVENT", payload);
  }

  sendEventToAdmins(adminIds: ID[]): void {
    const users = adminIds.map(id => ({
      type: END_USER_ENUM.ADMIN,
      id,
    }));
    this.sendToUsers(users);
  }
}
