import { TEndUserEnum } from "../../../constants/globalEnums";
import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { Issue, IssueMetaData, TIssuesStatusEnum } from "./issue.entity";

export abstract class IssueRepo extends BaseRepo<IssueMetaData> {
  abstract listIssues: (
    filter: {
      parentId?: ID;
      teacherId?: ID;
      authorIds?: ID[];
      issueStatus?: TIssuesStatusEnum;
      issueReasonIds?: ID[];
      isSeen?: boolean;
    },
    options: ListOptions,
  ) => Promise<
    ResponseWithPagination<
      Populate<IssueMetaData, "author" | "teacher" | "studentProfile" | "reason">
    >
  >;

  abstract updateViewStatusOfIssue(
    issue: Issue,
    userType: PickFromEnum<TEndUserEnum, "parent" | "teacher" | "admin">,
  ): Promise<void>;

  abstract getUnseenIssuesNumberForAdmin(): Promise<number>;

  abstract getUnseenIssuesNumberForTeacher(teacherId: ID): Promise<number>;

  abstract getUnseenIssuesNumberForParent(parentId: ID): Promise<number>;
}
