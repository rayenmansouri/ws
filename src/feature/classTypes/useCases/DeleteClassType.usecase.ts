import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { StudentRepo } from "../../students/domain/Student.repo";
import { PreRegistrationRepo } from "../../preRegistration/domains/PreRegistration.repo";

@injectable()
export class DeleteClassTypeUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo,
  ) {}

  async execute(classTypeNewId: string): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );
    const classDocs = await this.classRepo.findManyByClassType(classType._id);

    if (classDocs.length > 0) throw new BadRequestError("classType.linkedWithSomeClasses");

    const studentEnrolledWithClassType = await this.studentRepo.findManyByClassType(classType._id);
    const studentEnrolledToNextClassType = await this.studentRepo.findManyByNextClassType(
      classType._id,
    );

    const students = [...studentEnrolledWithClassType, ...studentEnrolledToNextClassType];

    if (students.length > 0) throw new BadRequestError("classType.linkedWithSomeStudents");

    const preRegistrations = await this.preRegistrationRepo.findManyByClassType(classType._id);

    if (preRegistrations.length > 0)
      throw new BadRequestError("classType.linkedWithSomePreRegistrations");

    const classTypeLinkedWithNextClassType = await this.classTypeRepo.findManyByNextClassType(
      classType._id,
    );

    if (classTypeLinkedWithNextClassType.length > 0)
      throw new BadRequestError("classType.linkedWithSomeNextClassTypes");

    await this.classTypeRepo.deleteOneById(classType._id);
  }
}
