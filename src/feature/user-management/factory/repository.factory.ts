import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { UserRepository } from "../base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../constants";
import { UserTypeEnum } from "./enums";
import { Organization } from "../../organization-magement/domain/organization.entity";

@Injectable({
  identifier: "REPOSITORY_FACTORY",
})
export class RepositoryFactory {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepo: UserRepository,
  ) {}

  getRepository(userType?: UserTypeEnum): UserRepository {
    // For now, we return the base user repository for all types
    // This can be extended in the future to return specific repositories per user type
    return this.userRepo;
  }
}

export const REPOSITORY_FACTORY_IDENTIFIER = "REPOSITORY_FACTORY";