import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { IBAveragesOfClassDTO } from "../../dto/ib/IBAveragesOfClass.dto";

@injectable()
export class GetIBAveragesOfClassUsecase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<IBAveragesOfClassDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const diplomas = await this.diplomaRepo.findAll();

    const classGrades = await this.ibClassGradesRepo.loadTermClassGrades(classDoc._id, termDoc._id);

    if (classDoc.students.length === 0)
      return {
        numberOfStudents: 0,
        studentAverages: [],
      };

    const studentAverages: IBAveragesOfClassDTO["studentAverages"] = classDoc.students.map(
      student => {
        const studentAverage = classGrades.calculateStudentAverage(student._id);
        const diploma = diplomas.find(diploma =>
          studentAverage.mark !== null
            ? studentAverage.mark >= diploma.minAverage && studentAverage.mark <= diploma.maxAverage
            : null,
        );

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: studentAverage.format(),
          diplomaName: diploma?.name ?? null,
        };
      },
    );

    return {
      numberOfStudents: classDoc.students.length,
      studentAverages,
    };
  }
}
