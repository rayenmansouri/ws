import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  Admin,
  AdminMetaData,
} from "../../../feature/admins/domain/admin.entity";
import {
  AdminMapper,
  AdminPersistence,
} from "../../../feature/admins/mappers/Admin.mapper";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { ID } from "./../../../shared/value-objects/ID.vo";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoAdminRepo extends MongoBaseRepo<
  Admin,
  AdminPersistence,
  AdminMetaData
> {
  protected toDomain = AdminMapper.toDomain;

  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null
  ) {
    super(connection, "admin", session);
  }

  async listAdmins(
    filter: { search?: string; isArchived?: boolean },
    options: ListOptions
  ): Promise<ResponseWithPagination<Admin>> {
    const filterQuery: FilterQuery<AdminPersistence> = {
      isActive: true,
    };

    if (filter.search) {
      filterQuery.$or = [];

      filterQuery.$or.push({
        fullName: { $regex: filter.search, $options: "i" },
      });
      filterQuery.$or.push({
        phoneNumber: { $regex: filter.search, $options: "i" },
      });
      filterQuery.$or.push({ newId: { $regex: filter.search, $options: "i" } });
    }

    const response = await this.findManyWithPagination(
      { ...filterQuery, isArchived: filter.isArchived === true ? true : false },
      options
    );
    response.docs = response.docs.map((doc) => this.toDomain(doc));

    return response;
  }

  async findManyByFullNameAndIds(
    fullName: string,
    ids: ID[]
  ): Promise<Admin[]> {
    const admins = await this.model.find({
      _id: { $in: ids },
      fullName: { $regex: fullName, $options: "i" },
      isActive: true,
    });
    return admins;
  }

  async removeRoleFromAdmin(roleId: ID): Promise<void> {
    await this.model.updateMany(
      { roles: { $in: [roleId] } },
      { $pull: { roles: roleId } },
      { session: this.session }
    );
  }

  async findImpersonatedAdmin(): Promise<AdminMetaData["entity"] | null> {
    return await this.model.findOne({ isActive: true });
  }

  async getAdminsCountExcludingArchivedAndImpersonated(): Promise<number> {
    return this.model.count({ isActive: true });
  }
  async findManyByRoleIds(roleIds: ID[]): Promise<AdminMetaData["entity"][]> {
    return this.model.find({
      roles: { $in: roleIds },
      isActive: true,
    });
  }
}
