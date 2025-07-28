import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { NotificationSettingsService } from "../../notifications/NotificationSettings.service";
import { School } from "../../schools/domain/school.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { AddBaseUserRequest, BaseAddUserUseCase } from "../../users/useCases/BaseAddUser.usecase";
import { Student } from "../domain/student.entity";
import { StudentRepo } from "../domain/Student.repo";
import { ClassTypeRules } from "../../classTypes/ClassType.rules";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { StudentProfileRepo } from "../domain/StudentProfile.repo";
import { StudentApplicationService } from "../application/Student.application.service";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";

export type AddStudentRequest = {
  nextClassType?: ID;
  level: ID;
  classType: ID;
  parents: ID[];
  uniqueId?: string;
} & AddBaseUserRequest;

@injectable()
export class AddStudentUseCase extends BaseAddUserUseCase<AddStudentRequest, Student> {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("NotificationSettingsService") notificationSettingsService: NotificationSettingsService,
    @inject("RoleRepo") roleRepo: RoleRepo,
    @inject("EventDispatcher") eventDispatcher: EventDispatcher,
  ) {
    super(
      fileManager,
      END_USER_ENUM.STUDENT,
      school,
      notificationSettingsService,
      roleRepo,
      eventDispatcher,
    );
  }

  protected async preAddUser(studentDetails: AddStudentRequest): Promise<void> {
    const level = await this.levelRepo.findOneByIdOrThrow(studentDetails.level, "notFound.level");
    const classType = await this.classTypeRepo.findOneByIdOrThrow(
      studentDetails.classType,
      "notFound.classType",
      {
        populate: ["subLevel"],
      },
    );
    ClassTypeRules.ensureClassTypeMatchLevel(classType, level);

    if (studentDetails.nextClassType)
      await this.classTypeRepo.findOneByIdOrThrow(
        studentDetails.nextClassType,
        "notFound.nextClassType",
      );

    if (studentDetails.uniqueId)
      await this.studentRepo.ensureFieldUniqueness(
        "uniqueId",
        studentDetails.uniqueId,
        "alreadyUsed.uniqueId",
      );
  }

  protected async postAddUser(student: Student, studentDetails: AddStudentRequest): Promise<void> {
    const level = await this.levelRepo.findOneByIdOrThrow(studentDetails.level, "notFound.level");

    await this.studentProfileRepo.addOne({
      class: null,
      classGroup: null,
      groups: [],
      schoolYear: level.currentSchoolYear._id,
      student: student._id,
      isExceptionallyPromoted: false,
    });

    const parents = await this.parentRepo.findManyByIdsOrThrow(
      studentDetails.parents,
      "notFound.parent",
    );

    await this.studentApplicationService.assignStudentsToParents([student], parents);
  }

  protected async addUserToDB(
    studentDetails: AddStudentRequest,
    baseUserDetails: Omit<BaseUser, keyof BaseEntity>,
  ): Promise<Student> {
    return await this.studentRepo.addOne({
      ...baseUserDetails,
      classType: studentDetails.classType,
      level: studentDetails.level,
      nextClassType: studentDetails.nextClassType || null,
      parents: [],
      uniqueId: studentDetails.uniqueId || null,
    });
  }
}
