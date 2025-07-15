import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Admin, AdminMetaData } from "../../../feature/admins/domain/admin.entity";
import { AdminRepo } from "../../../feature/admins/domain/Admin.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoAdminRepo extends MongoBaseRepo<AdminMetaData> implements AdminRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "admin", session);
  }

  async listAdmins(
    filter: { search?: string; isArchived?: boolean; isActive?: boolean },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Admin>> {
    const filterQuery: FilterQuery<AdminMetaData["entity"]> = {
      isImpersonation: false,
    };

    if (filter.search) {
      filterQuery.$or = [];

      filterQuery.$or.push({ fullName: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ phoneNumber: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ newId: { $regex: filter.search, $options: "i" } });
    }

    if (filter.isActive != undefined) filterQuery.isActive = filter.isActive;

    const response = await this.findManyWithPagination(
      { ...filterQuery, isArchived: filter.isArchived === true ? true : false },
      options,
    );

    return response;
  }

  async findManyByFullNameAndIds(fullName: string, ids: ID[]): Promise<AdminMetaData["entity"][]> {
    const admins = await this.model.find({
      _id: { $in: ids },
      fullName: { $regex: fullName, $options: "i" },
      isArchived: false,
      isImpersonation: false,
    });
    return admins;
  }

  async removeRoleFromAdmin(roleId: ID): Promise<void> {
    await this.model.updateMany(
      { roles: { $in: [roleId] } },
      { $pull: { roles: roleId } },
      { session: this.session },
    );
  }

  async findImpersonatedAdmin(): Promise<Admin | null> {
    return await this.model.findOne({ isImpersonation: true });
  }

  async getAdminsCountExcludingArchivedAndImpersonated(): Promise<number> {
    return this.model.count({ isArchived: false, isImpersonation: false });
  }
  async findManyByRoleIds(roleIds: ID[]): Promise<Admin[]> {
    return this.model.find({
      roles: { $in: roleIds },
      isImpersonation: false,
      isArchived: false,
    });
  }
}
