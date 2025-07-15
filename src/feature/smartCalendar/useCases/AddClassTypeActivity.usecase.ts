import { injectable } from "inversify/lib/inversify";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { inject } from "../../../core/container/TypedContainer";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { ID } from "../../../types/BaseEntity";
import { BadRequestError } from "../../../core/ApplicationErrors";

type AddClassTypeActivityRequest = {
  classTypeNewId: string;
  sessionType: ID;
  subjectType: ID;
  subSubjectType: ID | null;
  perGroup: boolean;
  week: "A" | "B" | null;
  durationInMinutes: number;
};

@injectable()
export class AddClassTypeActivityUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
  ) {}

  async execute(dto: AddClassTypeActivityRequest): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      dto.classTypeNewId,
      "notFound.classType",
    );

    await this.sessionTypeRepo.findOneByIdOrThrow(dto.sessionType, "notFound.sessionType");

    const subjectType = await this.subjectTypeRepo.findOneByIdOrThrow(
      dto.subjectType,
      "notFound.subjectType",
    );
    const isValidSubjectType = classType.subjects.some(
      subject => subject.subjectType === subjectType._id,
    );
    if (!isValidSubjectType) throw new BadRequestError("invalid.subjectType");

    if (dto.subSubjectType) {
      const subSubjectType = await this.subSubjectTypeRepo.findOneByIdOrThrow(
        dto.subSubjectType,
        "notFound.subSubjectType",
      );

      const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id)!;
      const isValidSubSubjectType = subject.subSubjects.some(
        subSubject => subSubject.subSubjectType === subSubjectType._id,
      );
      if (!isValidSubSubjectType) throw new BadRequestError("invalid.subSubjectType");
    }

    await this.classTypeRepo.addActivityToClassType(classType._id, {
      sessionType: dto.sessionType,
      subjectType: dto.subjectType,
      subSubjectType: dto.subSubjectType,
      perGroup: dto.perGroup,
      week: dto.week,
      durationInMinutes: dto.durationInMinutes,
    });
  }
}
