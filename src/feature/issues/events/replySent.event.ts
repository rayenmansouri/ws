import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { ID } from "../../../types/BaseEntity";
import { InteractionDTO } from "../dtos/interaction.dto";

export type TSendReplyEventPayload = {
  issueId: ID;
  issueNewId: string;
  interaction: InteractionDTO;
};

export class ReplySentEvent extends BaseEvent {
  constructor(tenantId: string, payload: TSendReplyEventPayload) {
    super(tenantId, "REPLY_SENT_EVENT", payload);
  }

  sendEventToAdminAndTeacher(userIds: Omit<TUserIdsEvent, "parentId">): void {
    const admin = userIds.adminIds.map(id => this.formatUser(END_USER_ENUM.ADMIN, id)!);

    const teacher = this.formatUser(END_USER_ENUM.TEACHER, userIds.teacherId);

    const users = [...admin, ...(teacher ? [teacher] : [])];

    this.sendToUsers(users);
  }

  sendEventToParent(parentId: ID | null): void {
    const parent = this.formatUser(END_USER_ENUM.PARENT, parentId);

    if (!parent) return;

    this.sendToUsers([parent]);
  }

  private formatUser = (endUser: TEndUserEnum, id: ID | null): IFormatUser =>
    id ? { id: id.toString(), type: endUser } : null;
}

type IFormatUser = { id: string; type: TEndUserEnum } | null;
type TUserIdsEvent = {
  parentId: ID | null;
  adminIds: ID[];
  teacherId: ID | null;
};
