import { injectable } from "inversify";
import { AddBaseUserRequest, BaseAddUserUseCase } from "../../users/useCases/BaseAddUser.usecase";
import { Admin } from "../domain/admin.entity";
import { School } from "../../schools/domain/school.entity";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { NotificationSettingsService } from "../../notifications/NotificationSettings.service";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { AdminRepo } from "../domain/Admin.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { BaseEntity } from "../../../types/BaseEntity";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";

type AddAdminRequest = {
  isImpersonation: boolean;
} & AddBaseUserRequest;

@injectable()
export class AddAdminUseCase extends BaseAddUserUseCase<AddAdminRequest, Admin> {
  constructor(
    @inject("AdminRepo") private adminRepo: AdminRepo,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("NotificationSettingsService")
    notificationSettingsService: NotificationSettingsService,
    @inject("RoleRepo") roleRepo: RoleRepo,
    @inject("EventDispatcher") eventDispatcher: EventDispatcher,
  ) {
    super(
      fileManager,
      END_USER_ENUM.ADMIN,
      school,
      notificationSettingsService,
      roleRepo,
      eventDispatcher,
    );
  }

  protected async addUserToDB(
    adminDetails: AddAdminRequest,
    baseUserDetails: Omit<BaseUser, keyof BaseEntity>,
  ): Promise<Admin> {
    return await this.adminRepo.addOne({
      ...baseUserDetails,
      isImpersonation: adminDetails.isImpersonation,
    });
  }

  protected async preAddUser(userDetails: AddAdminRequest): Promise<void> {
    if (userDetails.roles.length > 0) {
      await this.roleRepo.findAdminRoleByIdsOrThrow(userDetails.roles);
    }
  }

  protected async postAddUser(): Promise<void> {}
}
