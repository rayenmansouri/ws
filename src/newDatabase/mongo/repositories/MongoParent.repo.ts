import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Parent, ParentMetaData } from "../../../feature/parents/domain/parent.entity";
import { ParentRepo } from "../../../feature/parents/domain/Parent.repo";
import { ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

@injectable()
export class MongoParentRepo extends MongoBaseRepo<ParentMetaData> implements ParentRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "parent", session);
  }

  async addStudentsToParents(studentIds: ID[], parentIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: parentIds } },
      { $push: { students: studentIds } },
      { session: this.session || undefined },
    );
  }

  async removeStudentsFromParents(studentIds: ID[], parentIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: parentIds } },
      { $pull: { students: { $in: studentIds } } },
      { session: this.session || undefined },
    );
  }

  async listParentWithStudents(
    filter: { search?: string; isArchived?: boolean },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<ParentMetaData, "students">>> {
    const filterQuery: FilterQuery<Parent> = {};

    if (filter.search)
      filterQuery.$or = [
        { fullName: { $regex: filter.search, $options: "i" } },
        { email: { $regex: filter.search, $options: "i" } },
        { phoneNumber: { $regex: filter.search, $options: "i" } },
        { newId: { $regex: filter.search, $options: "i" } },
      ];

    const data = await this.findManyWithPagination(
      { ...filterQuery, isArchived: filter.isArchived === true ? true : false },
      {
        ...options,
        populate: ["students"],
      },
    );

    return data;
  }

  async findManyByFullName(fullName: string): Promise<ParentMetaData["entity"][]> {
    const parents = await this.model.find({
      fullName: { $regex: fullName, $options: "i" },
      isArchived: false,
    });

    return parents;
  }

  async findManyByFullNameAndIds(fullName: string, ids: ID[]): Promise<ParentMetaData["entity"][]> {
    const parents = await this.model.find({
      _id: { $in: ids },
      fullName: { $regex: fullName, $options: "i" },
      isArchived: false,
    });

    return parents;
  }

  async removeStudentFromParents(parentIds: ID[], studentId: ID): Promise<void> {
    await this.model.updateMany(
      {
        _id: { $in: parentIds },
      },
      {
        $pull: { students: studentId },
      },
      { session: this.session || undefined },
    );
  }

  async getNotArchivedParentsCount(): Promise<number> {
    return this.model.count({ isArchived: false });
  }
}
