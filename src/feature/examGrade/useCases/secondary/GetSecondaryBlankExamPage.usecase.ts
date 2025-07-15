import { injectable } from "inversify";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { School } from "../../../schools/domain/school.entity";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { GradingEntity } from "../../domain/tunisian/Grading.entity";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { BlankExamPageDTO } from "../../dto/BlankExamPage.dto";

@injectable()
export class GetSecondaryBlankExamPageUsecase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("School") private school: School,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
  ) {}

  async execute({
    classNewId,
    termNewId,
    subjectNewId,
    subSubjectNewId,
  }: {
    classNewId: string;
    termNewId: string;
    subjectNewId: string;
    subSubjectNewId?: string;
  }): Promise<BlankExamPageDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const classGrades = await this.secondaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const subject = classGrades.subjects.find(subject => subject.newId === subjectNewId);
    if (!subject) throw new NotFoundError("notFound.subject");

    const hasSubSubject = subject.subTopics.length > 0;
    if (hasSubSubject && !subSubjectNewId) throw new BadRequestError("global.badRequest");

    let gradingEntity: GradingEntity;
    if (!hasSubSubject) gradingEntity = subject;
    else {
      const subSubject = subject.subTopics.find(subSubject => subSubject.newId === subSubjectNewId);
      if (!subSubject) throw new NotFoundError("notFound.subSubject");
      gradingEntity = subSubject;
    }

    const headers: string[] = gradingEntity.examGrades.map(exam => exam.examType);

    return {
      headers,
      records: classDoc.students.map(student => ({
        student: UserMapper.toUserProfileDTO(student),
        grades: gradingEntity.examGrades.reduce((acc, examGrade) => {
          acc[examGrade.examType] = examGrade.findStudentGrade(student._id).format();
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
