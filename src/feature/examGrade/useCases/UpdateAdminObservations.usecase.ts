import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { TermRepo } from "../../terms/repos/Term.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { ID } from "../../../types/BaseEntity";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class UpdateAdminObservationsUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute(
    classNewId: string,
    termNewId: string,
    adminObservations: Record<ID, string | null>,
  ): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const gradeBookObservation = await this.gradeBookObservationRepo.findAdminObservations(
      classDoc._id,
      termDoc._id,
    );

    for (const [studentId, _] of Object.entries(adminObservations)) {
      const isValidStudentId = classDoc.students.some(id => id === studentId);
      if (!isValidStudentId) throw new BadRequestError("student.notAssignedToClass");
    }

    await this.gradeBookObservationRepo.updateStudentsObservations(
      gradeBookObservation._id,
      adminObservations,
    );
  }
}
