import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassGroupRepo } from "../../classes/domain/classGroup.repo";
import { StudentRepo } from "../domain/Student.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { StudentApplicationService } from "./../application/Student.application.service";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { StudentProfileRepo } from "../domain/StudentProfile.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";

export type SwitchStudentsClassRequestDto = {
  studentsNewIds: string[];
  classNewId: string;
};

@injectable()
export class SwitchStudentsClassUseCase {
  constructor(
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("ClassGroupRepo") private readonly groupRepo: ClassGroupRepo,
    @inject("ExamGradeRepo") private readonly examGradeRepo: ExamGradeRepo,
    @inject("StudentApplicationService")
    private readonly studentApplicationService: StudentApplicationService,
    @inject("GradeBookObservationRepo")
    private readonly gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("StudentProfileRepo") private readonly studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(dto: SwitchStudentsClassRequestDto): Promise<void> {
    const studentsPromise = this.studentRepo.findManyByNewIdsOrThrow(
      dto.studentsNewIds,
      "notFound.student",
    );

    const classPromise = this.classRepo.findOneByNewIdOrThrow(dto.classNewId, "notFound.class");

    const [students, classDoc] = await Promise.all([studentsPromise, classPromise]);

    if (students.some(student => student.classType !== classDoc.classType))
      throw new BadRequestError("invalid.classType");

    const studentsAcademicDetailsPromises = [];
    for (const student of students)
      studentsAcademicDetailsPromises.push(
        this.studentApplicationService.getCurrentAcademicDetails(student),
      );

    const studentsAcademicDetails = await Promise.all(studentsAcademicDetailsPromises);

    let i = 0;
    for (const student of students) {
      const studentAcademicDetails = studentsAcademicDetails[i];

      if (!studentAcademicDetails.classId)
        throw new BadRequestError("studentRules.studentNotAssignedToClass");
      if (studentAcademicDetails.classId === classDoc._id)
        throw new BadRequestError("invalid.class");

      const studentExamGrades = await this.examGradeRepo.getExamGradesOfClass(
        studentAcademicDetails.classId,
      );

      const studentGradeBookObservations =
        await this.gradeBookObservationRepo.getGradeBookObservationOfStudent(
          studentAcademicDetails.classId,
          student._id,
        );

      const promises = [];

      for (const gradeBook of studentGradeBookObservations)
        promises.push(
          this.gradeBookObservationRepo.swapStudentGradeBookObservation(
            student._id,
            classDoc._id,
            gradeBook,
          ),
        );

      for (const examGrade of studentExamGrades)
        promises.push(
          this.examGradeRepo.swapStudentExamGrade(student._id, classDoc._id, examGrade),
        );

      const examGradesIds = studentExamGrades.map(examGrade => examGrade._id);

      const studentGradeBookObservationIds = studentGradeBookObservations.map(
        gradeBookObservation => gradeBookObservation._id,
      );

      promises.push(
        this.examGradeRepo.unsetStudentDegreeOfExamGrades(student._id, examGradesIds),
        this.gradeBookObservationRepo.unsetStudentGradeBookObservation(
          student._id,
          studentGradeBookObservationIds,
        ),
        this.classRepo.switchStudentClass(
          student._id,
          studentAcademicDetails.classId,
          classDoc._id,
        ),
      );
      const previousClass = await this.classRepo.findOneByIdOrThrow(
        studentAcademicDetails.classId,
        "notFound.class",
        {
          populate: ["classGroups"],
        },
      );

      const previousStudentGroup = previousClass.classGroups.find(group =>
        group.students.includes(student._id),
      )!;

      promises.push(
        this.groupRepo.switchStudentGroup(
          student._id,
          previousStudentGroup._id,
          classDoc.classGroups[0],
        ),
        promises.push(
          this.studentProfileRepo.updateManyByStudentsAndSchoolYear(
            [student._id],
            classDoc.schoolYear,
            {
              class: classDoc._id,
              classGroup: classDoc.classGroups[0],
            },
          ),
        ),
      );

      await Promise.all(promises);
      i = i + 1;
    }
  }
}
