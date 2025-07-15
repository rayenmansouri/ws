import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  Issue,
  IssueMetaData,
  TIssuesStatusEnum,
} from "../../../feature/issues/domain/issue.entity";
import { IssueRepo } from "../../../feature/issues/domain/Issue.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { PickFromEnum } from "../../../types/utils/enums.util";

export class MongoIssueRepo extends MongoBaseRepo<IssueMetaData> implements IssueRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "issue", session);
  }

  async listIssues(
    filter: {
      parentId?: ID;
      teacherId?: ID;
      issueStatus?: TIssuesStatusEnum;
      issueReasonIds?: ID[];
      isSeen?: boolean;
      authorIds?: ID[];
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Populate<IssueMetaData, "author" | "teacher" | "studentProfile" | "reason">
    >
  > {
    const filterQuery: FilterQuery<Issue> = {};

    if (filter.teacherId) {
      filterQuery.teacher = filter.teacherId;
      filterQuery.isForwarded = true;
    }

    if (filter.parentId) filterQuery.author = filter.parentId;

    if (filter.issueStatus) filterQuery.status = filter.issueStatus;

    if (filter.issueReasonIds) filterQuery.reason = { $in: filter.issueReasonIds };

    if (filter.authorIds) filterQuery.author = { $in: filter.authorIds };

    if (filter.isSeen !== undefined)
      filterQuery.participantViewStatuses = {
        $elemMatch: { isSeen: filter.isSeen, participantType: END_USER_ENUM.ADMIN },
      };

    console.log({ filterQuery });

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["author", "teacher", "studentProfile", "reason"],
      sort: { lastInteractionDate: -1 },
    });

    console.log(data);

    return data;
  }

  async updateViewStatusOfIssue(
    issue: Issue,
    userType: PickFromEnum<TEndUserEnum, "parent" | "teacher" | "admin">,
  ): Promise<void> {
    const viewStatusIndex = issue.participantViewStatuses.findIndex(
      participantViewStatus => participantViewStatus.participantType === userType,
    );

    await this.model.updateOne(
      { _id: issue._id },
      {
        [`participantViewStatuses.${viewStatusIndex}.isSeen`]: true,
      },
    );
  }

  async getUnseenIssuesNumberForAdmin(): Promise<number> {
    const numberOfUnseenIssues = await this.model.countDocuments({
      participantViewStatuses: {
        $elemMatch: { isSeen: false, participantType: END_USER_ENUM.ADMIN },
      },
    });

    return numberOfUnseenIssues;
  }

  async getUnseenIssuesNumberForTeacher(teacherId: ID): Promise<number> {
    const numberOfUnseenIssues = await this.model.countDocuments({
      teacher: teacherId,
      participantViewStatuses: {
        $elemMatch: { isSeen: false, participantType: END_USER_ENUM.TEACHER },
      },
    });

    return numberOfUnseenIssues;
  }

  async getUnseenIssuesNumberForParent(parentId: ID): Promise<number> {
    const numberOfUnseenIssues = await this.model.countDocuments({
      author: parentId,
      participantViewStatuses: {
        $elemMatch: { isSeen: false, participantType: END_USER_ENUM.PARENT },
      },
    });

    return numberOfUnseenIssues;
  }
}
