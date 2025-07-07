import { ClientSession, Connection, FilterQuery } from "mongoose";
import {
  TActionsEnum,
  TResourcesEnum,
} from "../../../constants/ActionsResource";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { InternalError, NotFoundError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import {
  Role,
  RoleMetaData,
  SUPER_ADMIN_ROLE,
} from "../../../feature/authorization/domain/role.entity";
import { RoleRepo } from "../../../feature/authorization/domain/Role.repo";
import { RoleService } from "../../../feature/authorization/domain/Role.service";
import { ID } from "../../../shared/value-objects/ID.vo";
import { TLanguageEnum } from "../../../translation/constants";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { mongoRoleModel } from "./../schemas/role.schema";
import { MongoMasterBaseRepo } from "./MongoMasterBase.repo";

export class MongoRoleRepo
  extends MongoMasterBaseRepo<RoleMetaData>
  implements RoleRepo
{
  constructor(
    @inject("MasterConnection") connection: Connection,
    @inject("Session") session: ClientSession | null
  ) {
    super(connection, mongoRoleModel, session);
  }

  async findAdminRoleByIdsOrThrow(ids: ID[]): Promise<Role[]> {
    const roles = await this.model.find({
      _id: { $in: ids },
      userTypes: { $in: END_USER_ENUM.ADMIN },
    });

    if (roles.length !== ids.length)
      throw new NotFoundError("roleManagement.roleNotFound");

    return roles;
  }

  async findTeacherRoleByIdsOrThrow(ids: ID[]): Promise<Role[]> {
    const roles = await this.model.find({
      _id: { $in: ids },
      userTypes: { $in: END_USER_ENUM.TEACHER },
    });

    if (roles.length !== ids.length)
      throw new NotFoundError("roleManagement.roleNotFound");

    return roles;
  }

  async findMasterRoleByIdsOrThrow(ids: ID[]): Promise<Role[]> {
    const roles = await this.model.find({
      _id: { $in: ids },
      userTypes: { $in: END_USER_ENUM.MASTER },
    });

    if (roles.length !== ids.length)
      throw new NotFoundError("roleManagement.roleNotFound");

    return roles;
  }

  async findSuperAdminRoleOrThrow(): Promise<Role> {
    const superAdminRole = await this.model.findOne({ name: SUPER_ADMIN_ROLE });

    if (!superAdminRole) throw new InternalError("global.internalError");

    return superAdminRole;
  }

  async findRolesByPermission(
    action: TActionsEnum,
    resource: TResourcesEnum
  ): Promise<Role[]> {
    return await this.model.find({
      $or: [
        {
          permissions: {
            $in: [RoleService.formatPermission(action, resource)],
          },
        },
        { name: SUPER_ADMIN_ROLE },
      ],
    });
  }

  async listRoles(
    filter: {
      search?: string;
      userTypes?: TEndUserEnum[];
      language?: TLanguageEnum;
    },
    options: ListOptions
  ): Promise<ResponseWithPagination<Role>> {
    const filterQuery: FilterQuery<Role> = {};

    if (filter.search && filter.language)
      filterQuery[`translation.${filter.language}`] = {
        $regex: filter.search,
        $options: "i",
      };

    if (filter.search && !filter.language)
      filterQuery.name = { $regex: filter.search, $options: "i" };

    if (filter.userTypes) filterQuery.userTypes = { $in: filter.userTypes };

    const roles = await this.findManyWithPagination(filterQuery, options);

    return roles;
  }
}
