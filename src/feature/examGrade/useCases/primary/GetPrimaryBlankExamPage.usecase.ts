import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { School } from "../../../schools/domain/school.entity";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { BlankExamPageDTO } from "../../dto/BlankExamPage.dto";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";

@injectable()
export class GetPrimaryBlankExamPageUsecase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("School") private school: School,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
  ) {}

  async execute(
    classNewId: string,
    termNewId: string,
    fieldIndex: number,
  ): Promise<BlankExamPageDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const classGrades = await this.primaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    if (fieldIndex >= classGrades.fields.length || fieldIndex < 0)
      throw new NotFoundError("notFound.field");
    const field = classGrades.fields[fieldIndex];

    const headers: string[] = [];
    field.subTopics.forEach(subject => {
      if (subject.subTopics.length === 0 && subject.examGrades.length > 0)
        headers.push(subject.name);

      if (subject.subTopics.length > 0)
        subject.subTopics
          .filter(subTopic => subTopic.examGrades.length > 0)
          .forEach(subTopic => headers.push(subTopic.name));
    });

    return {
      headers,
      records: classDoc.students.map(student => ({
        student: UserMapper.toUserProfileDTO(student),
        grades: field.subTopics.reduce((acc, subject) => {
          if (subject.subTopics.length === 0 && subject.examGrades.length > 0)
            acc[subject.name] = subject.calculateStudentAverage(student._id).format();

          if (subject.subTopics.length > 0)
            subject.subTopics.forEach(subSubject => {
              if (subSubject.examGrades.length > 0)
                acc[subSubject.name] = subSubject.calculateStudentAverage(student._id).format();
            });

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
      teacherName: field.teacher?.fullName ?? null,
      subjectName: field.name,
    };
  }
}
