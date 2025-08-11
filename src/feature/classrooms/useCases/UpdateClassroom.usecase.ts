import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassroomRepo } from "../domains/classroom.repo";
import { ID } from "../../../types/BaseEntity";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";

@injectable()
export class UpdateClassroomUseCase {
  constructor(
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
  ) {}

  async execute(
    classroomNewId: string,
    dto: {
      name?: string;
      allowAllSubjects?: boolean;
      subjectTypes?: ID[];
      allowAllSessionTypes?: boolean;
      sessionTypes?: ID[];
    },
  ): Promise<void> {
    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );

    if (dto.name && classroom.name !== dto.name)
      await this.classroomRepo.ensureFieldUniqueness("name", dto.name, "alreadyUsed.name");

    if (dto.subjectTypes)
      await this.subjectTypeRepo.findManyByIdsOrThrow(dto.subjectTypes, "notFound.subjectType");

    if (dto.sessionTypes)
      await this.sessionTypeRepo.findManyByIdsOrThrow(dto.sessionTypes, "notFound.sessionType");

    await this.classroomRepo.updateOneByNewId(classroomNewId, dto);
  }
}
