import { IssueReason } from "../domain/issueReason.entity";
import { IssueReasonDTO } from "../dtos/issueReason.dto";

export class IssueReasonMapper {
  static toIssueReasonDTO(issueReason: IssueReason): IssueReasonDTO {
    return {
      _id: issueReason._id,
      newId: issueReason.newId,
      name: issueReason.name,
      color: issueReason.color,
      iconUrl: issueReason.iconUrl,
    };
  }
}
