import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { AddParentUseCase } from "../../parents/useCases/AddParent.usecase";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { AddStudentUseCase } from "../../students/useCases/AddStudent.usecase";
import { PRE_REGISTRATION_STATUES_ENUM } from "../domains/preRegistration.entity";
import { PreRegistrationRepo } from "../domains/PreRegistration.repo";
import { PreRegistrationMapper } from "../mappers/PreRegistration.mapper";

export type RegisterStudentResponse = { parentId: string; studentId: string };

@injectable()
export class RegisterStudentUseCase {
  constructor(
    @inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo,
    @inject("AddParentUseCase") private addParentUseCase: AddParentUseCase,
    @inject("AddStudentUseCase") private addStudentUseCase: AddStudentUseCase,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
  ) {}

  async execute(preRegistrationId: ID): Promise<void> {
    const preRegistration = await this.preRegistrationRepo.findOneByIdOrThrow(
      preRegistrationId,
      "notFound.preRegistration",
    );

    const addParentRequest = PreRegistrationMapper.toAddParentUseCaseDTO(preRegistration);
    const createdParent = await this.addParentUseCase.execute(addParentRequest);

    const addStudentRequest = PreRegistrationMapper.toAddStudentUseCaseDTO(preRegistration);
    const createdStudent = await this.addStudentUseCase.execute(addStudentRequest);

    await this.preRegistrationRepo.updateOneById(preRegistration._id, {
      status: PRE_REGISTRATION_STATUES_ENUM.APPROVED,
      isRegister: true,
    });

    await this.studentApplicationService.assignStudentsToParents([createdStudent], [createdParent]);
  }
}
