import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { GradeBookObservationRepo } from "../../../gradeBookObservation/GradeBookObservation.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { IBAdminObservationsDTO } from "../../dto/ib/IBAdminObservations.dto";

@injectable()
export class GetIBAdminObservationsUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<IBAdminObservationsDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const adminObservations = await this.gradeBookObservationRepo.findAdminObservations(
      classDoc._id,
      termDoc._id,
    );

    return {
      records: classDoc.students.map(student => ({
        student: UserMapper.toUserProfileDTO(student),
        observation: adminObservations.observations[student._id] ?? null,
      })),
    };
  }
}
