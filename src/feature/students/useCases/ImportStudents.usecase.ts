import { injectable } from "inversify";
import { ApplicationError, BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { Parent } from "../../parents/domain/parent.entity";
import { AddParentUseCase } from "../../parents/useCases/AddParent.usecase";
import { TGenderEnum } from "../../users/domain/baseUser.entity";
import { AddStudentRequest, AddStudentUseCase } from "./AddStudent.usecase";

type ImportStudentsPayload = {
  studentFirstName: string;
  studentLastName: string;
  studentGender: TGenderEnum;
  studentEmail?: string;
  studentPhoneNumber?: string;
  studentAddress?: string;
  studentLevel: string;
  studentClassType: string;
  parentFirstName: string;
  parentLastName: string;
  parentGender: TGenderEnum;
  parentEmail?: string;
  parentPhoneNumber?: string;
  parentAddress?: string;
};

@injectable()
export class ImportStudentsUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("AddParentUseCase") private addParentUseCase: AddParentUseCase,
    @inject("AddStudentUseCase") private addStudentUseCase: AddStudentUseCase,
  ) {}

  async execute(payloads: ImportStudentsPayload[]): Promise<void> {
    const levels = await this.levelRepo.findAll();
    const classTypes = await this.classTypeRepo.findAll();

    const levelNames = levels.map(level => level.name);
    const classTypeNames = classTypes.map(classType => classType.name);

    payloads.forEach((record, i) => {
      if (!levelNames.includes(record.studentLevel)) throw new BadRequestError("notFound.level");

      if (!classTypeNames.includes(record.studentClassType))
        throw new BadRequestError("notFound.classType");

      if (!record.parentEmail && !record.parentPhoneNumber)
        throw new BadRequestError("validation.parentEmailOrPhoneNumberRequired", { row: i + 1 });
    });

    const createdParents: Parent[] = [];
    for (let i = 0; i < payloads.length; i++) {
      const record = payloads[i];

      const isParentExist = createdParents.find(
        parent =>
          (parent.phoneNumber !== undefined && parent.phoneNumber === record.parentPhoneNumber) ||
          (parent.email !== undefined && parent.email === record.parentEmail),
      );
      if (isParentExist) continue;

      const parentPayload = {
        firstName: record.parentFirstName,
        lastName: record.parentLastName,
        gender: record.parentGender,
        email: record.parentEmail,
        phoneNumber: record.parentPhoneNumber,
        address1: record.parentAddress,
        students: [],
        avatar: null,
        password: RandomUtils.generateRandomNumber(8).toString(),
        roles: [],
      };

      try {
        const createdParent = await this.addParentUseCase.execute(parentPayload);
        createdParents.push(createdParent);
      } catch (error) {
        if (error instanceof ApplicationError) {
          throw new BadRequestError(error.key, { row: i + 1 });
        }

        throw new BadRequestError("global.badRequest", { row: i + 1, error });
      }
    }

    for (let i = 0; i < payloads.length; i++) {
      const record = payloads[i];

      const parent = createdParents.find(
        parent =>
          parent.phoneNumber === record.parentPhoneNumber || parent.email === record.parentEmail,
      )!;

      const level = levels.find(level => level.name === record.studentLevel)!;
      const classType = classTypes.find(classType => classType.name === record.studentClassType)!;

      const studentPayload: AddStudentRequest = {
        firstName: record.studentFirstName,
        lastName: record.studentLastName,
        gender: record.studentGender,
        email: record.studentEmail,
        phoneNumber: record.studentPhoneNumber,
        address1: record.studentAddress,
        level: level._id,
        classType: classType._id,
        parents: [parent._id],
        avatar: null,
        password: RandomUtils.generateRandomNumber(8).toString(),
        roles: [],
      };

      try {
        await this.addStudentUseCase.execute(studentPayload);
      } catch (error) {
        if (error instanceof ApplicationError) {
          throw new BadRequestError(error.key, { row: i + 1 });
        }

        throw new BadRequestError("global.internalError", { row: i + 1 });
      }
    }
    return;
  }
}
