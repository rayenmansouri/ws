import { injectable } from "inversify/lib/inversify";
import { ID } from "../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { ClassroomRepo } from "../domains/classroom.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";

@injectable()
export class AddClassroomUseCase {
  constructor(
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
  ) {}

  async execute(dto: {
    name: string;
    allowAllSubjects: boolean;
    allowAllSessionTypes: boolean;
    subjectTypes: ID[];
    sessionTypes: ID[];
  }): Promise<void> {
    if (dto.subjectTypes.length > 0)
      await this.subjectTypeRepo.findManyByIdsOrThrow(dto.subjectTypes, "notFound.subjectType");

    if (dto.sessionTypes.length > 0)
      await this.sessionTypeRepo.findManyByIdsOrThrow(dto.sessionTypes, "notFound.sessionType");

    await this.classroomRepo.addOne(dto);
  }
}
