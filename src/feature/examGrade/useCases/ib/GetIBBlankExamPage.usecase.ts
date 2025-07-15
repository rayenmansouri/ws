import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { School } from "../../../schools/domain/school.entity";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { BlankExamPageDTO } from "../../dto/BlankExamPage.dto";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";

@injectable()
export class GetIBBlankExamPageUsecase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("School") private school: School,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
  ) {}

  async execute(
    classNewId: string,
    termNewId: string,
    subjectNewId: string,
  ): Promise<BlankExamPageDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const classGrades = await this.ibClassGradesRepo.loadTermClassGrades(classDoc._id, termDoc._id);

    const subject = classGrades.subjects.find(subject => subject.newId === subjectNewId);
    if (!subject) throw new NotFoundError("notFound.subject");

    const headers = subject.examGrades.map(exam => exam.examType);

    return {
      headers,
      records: classDoc.students.map(student => ({
        student: UserMapper.toUserProfileDTO(student),
        grades: subject.examGrades.reduce((acc, exam) => {
          acc[exam.examType] = exam.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>),
      })),
      schoolInformation: {
        name: this.school.name,
        address: this.school.address,
        phoneNumber: this.school.phoneNumber,
        email: this.school.email,
      },
      termName: termDoc.name,
      className: classDoc.name,
      teacherName: subject.teacher?.fullName ?? null,
      subjectName: subject.name,
    };
  }
}
