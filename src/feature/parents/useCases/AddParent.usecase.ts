import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";
import { FileManager } from "../../../core/fileManager/FileManager";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { NotificationSettingsService } from "../../notifications/NotificationSettings.service";
import { School } from "../../schools/domain/school.entity";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { CentralUserRepo } from "../../users/domain/CentralUser.repo";
import { AddBaseUserRequest, BaseAddUserUseCase } from "../../users/useCases/BaseAddUser.usecase";
import { Parent } from "../domain/parent.entity";
import { ParentRepo } from "../domain/Parent.repo";

export type AddParentRequest = {
  students?: ID[];
  nationalCardId?: string;
} & AddBaseUserRequest;

@injectable()
export class AddParentUseCase extends BaseAddUserUseCase<AddParentRequest, Parent> {
  constructor(
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("NotificationSettingsService")
    notificationSettingsService: NotificationSettingsService,
    @inject("CentralUserRepo") centralUserRepo: CentralUserRepo,
    @inject("RoleRepo") roleRepo: RoleRepo,
    @inject("EventDispatcher") eventDispatcher: EventDispatcher,
  ) {
    super(
      fileManager,
      END_USER_ENUM.PARENT,
      school,
      notificationSettingsService,
      centralUserRepo,
      roleRepo,
      eventDispatcher,
    );
  }

  protected async addUserToDB(
    parentDetails: AddParentRequest,
    baseUser: Omit<BaseUser, keyof BaseEntity>,
  ): Promise<Parent> {
    return await this.parentRepo.addOne({
      ...baseUser,
      students: [],
      nationalCardId: parentDetails.nationalCardId || null,
    });
  }

  protected async preAddUser(parentDetails: AddParentRequest): Promise<void> {
    if (parentDetails.nationalCardId)
      await this.parentRepo.ensureFieldUniqueness(
        "nationalCardId",
        parentDetails.nationalCardId,
        "alreadyUsed.nationalCardId",
      );
  }

  protected async postAddUser(parent: Parent, parentDetails: AddParentRequest): Promise<void> {
    if (!parentDetails.students) return;

    const students = await this.studentRepo.findManyByIdsOrThrow(
      parentDetails.students,
      "notFound.student",
    );

    await this.studentApplicationService.assignStudentsToParents(students, [parent]);
  }
}
