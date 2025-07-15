import { injectable } from "inversify";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { Parent } from "../../../parents/domain/parent.entity";
import { StudentApplicationService } from "../../../students/application/Student.application.service";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { StudentService } from "../../../students/domain/Student.service";
import { Term } from "../../../terms/domains/term.entity";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { ChildSecondaryGradeReportDto } from "../../dto/secondary/ChildSecondaryGradeReport.dto";
import { ClassService } from "../../../classes/domain/Class.service";

export type getSecondaryChildGradeRequestDto = {
  parent: Parent;
  studentNewId: string;
  termNewId?: string;
};
@injectable()
export class GetSecondaryChildGradeReportUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
  ) {}

  async execute(dto: getSecondaryChildGradeRequestDto): Promise<ChildSecondaryGradeReportDto> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );
    StudentService.ensureStudentIsAssignedToParent(student._id, dto.parent);

    const { classId } = await this.studentApplicationService.getCurrentAcademicDetails(student);

    if (!classId) throw new BadRequestError("student.notAssignedToClass");
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class", {
      populate: ["schoolYear"],
    });

    const noTermIsPublished =
      classDoc.gradeReports.length === 0 ||
      classDoc.gradeReports.every(report => report.isPublished === false);
    if (noTermIsPublished)
      return {
        terms: classDoc.schoolYear.terms.map(term => ({
          newId: term.newId,
          name: term.name,
          isLocked:
            classDoc.gradeReports.find(report => report.term === term._id)?.isPublished === true
              ? false
              : true,
        })),
        selectedTermNewId: null,
        studentAverage: null,
        studentRank: null,
        diplomaName: null,
        subjects: null,
      };

    const allTerms = classDoc.schoolYear.terms;
    let selectedTerm: Term | null = ClassService.findPublishedTerm(allTerms, classDoc);
    if (dto.termNewId) {
      const term = allTerms.find(term => term.newId === dto.termNewId);
      if (!term) throw new NotFoundError("notFound.term");
      selectedTerm = term;
    }

    if (!selectedTerm) throw new BadRequestError("term.notCompleted");

    const isTermLocked =
      classDoc.gradeReports.find(report => report.term === selectedTerm._id)?.isPublished === true
        ? false
        : true;
    if (isTermLocked) throw new BadRequestError("term.notCompleted");

    const classGrades = await this.secondaryClassGradesRepo.loadTermClassGrades(
      classId,
      selectedTerm._id,
    );
    const studentAverage = classGrades.calculateStudentAverage(student._id);

    const studentDiploma =
      studentAverage.mark !== null
        ? await this.diplomaRepo.findOneByAverage(studentAverage.mark)
        : null;

    return {
      terms: allTerms.map(term => ({
        newId: term.newId,
        name: term.name,
        isLocked:
          classDoc.gradeReports.find(report => report.term === term._id)?.isPublished === true
            ? false
            : true,
      })),
      selectedTermNewId: selectedTerm.newId,
      studentAverage: classGrades.calculateStudentAverage(student._id).format(),
      studentRank: null,
      diplomaName: studentDiploma?.name ?? null,
      subjects: classGrades.subjects.map(subject => {
        return {
          name: subject.name,
          average: subject.calculateStudentAverage(student._id).format(),
          exams: subject.examGrades.map(examGrade => ({
            name: examGrade.examType,
            grade: examGrade.findStudentGrade(student._id).format(),
          })),
          hasSubSubjects: subject.subTopics.length > 0,
          subSubjects: subject.subTopics.map(subSubject => {
            return {
              name: subSubject.name,
              exams: subSubject.examGrades.map(examGrade => ({
                name: examGrade.examType,
                grade: examGrade.findStudentGrade(student._id).format(),
              })),
            };
          }),
        };
      }),
    };
  }
}
