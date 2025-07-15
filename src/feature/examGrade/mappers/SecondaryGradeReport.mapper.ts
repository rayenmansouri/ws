import { translate } from "../../../translation/helper/translate";
import { ESTABLISHMENT_TITLE_ENUM, Level } from "../../levels/domains/level.entity";
import { School } from "../../schools/domain/school.entity";
import { Student } from "../../students/domain/student.entity";
import { Term } from "../../terms/domains/term.entity";
import { TPromotionStatusEnum } from "../domain/tunisian/ExamGrade.entity";
import { SecondaryTermClassGrades } from "../domain/tunisian/secondary/SecondaryTermClassGrades.entity";
import { SecondaryGradeReportDTO } from "../dto/secondary/SecondaryGradeReport.dto";

export class SecondaryGradeReportMapper {
  static toDTO({
    student,
    classGrades,
    school,
    level,
    term,
    allTermAverages,
    annualAverage,
    annualRank,
    promotionStatus,
  }: {
    student: Student;
    classGrades: SecondaryTermClassGrades;
    school: School;
    level: Level;
    term: Term;
    allTermAverages: {
      termName: string;
      average: string | null;
      rank: number | null;
      diplomaName: string | null;
    }[];
    annualAverage: string | null;
    annualRank: number | null;
    promotionStatus: TPromotionStatusEnum | null;
  }): SecondaryGradeReportDTO {
    const examTypes: { name: string; rank: number }[] = [];

    const subjects: SecondaryGradeReportDTO["gradeReport"]["subjects"] = [];
    for (const subject of classGrades.subjects) {
      if (subject.subTopics.length > 0) {
        for (const subSubject of subject.subTopics) {
          subjects.push({
            name: subSubject.name,
            coefficient: subSubject.coefficient,
            studentAverage: subSubject.calculateStudentAverage(student._id).format(),
            studentRank: subSubject.calculateStudentRank(student._id),
            teacherName: subSubject.teacher?.fullName || null,
            teacherObservation: subSubject.findStudentObservation(student._id),
            grades: subSubject.examGrades.reduce((acc, examGrade) => {
              if (!examTypes.find(examType => examType.name === examGrade.examType)) {
                examTypes.push({ name: examGrade.examType, rank: examGrade.examTypeRank });
              }

              acc[examGrade.examType] = examGrade.findStudentGrade(student._id).format();
              return acc;
            }, {} as Record<string, string | null>),
          });
        }

        subjects.push({
          name: subject.name,
          coefficient: subject.coefficient,
          studentAverage: subject.calculateStudentAverage(student._id).format(),
          studentRank: subject.calculateStudentRank(student._id),
          teacherName: subject.teacher?.fullName || null,
          teacherObservation: subject.findStudentObservation(student._id),
          grades: {},
        });
        continue;
      }

      subjects.push({
        name: subject.name,
        coefficient: subject.coefficient,
        grades: subject.examGrades.reduce((acc, examGrade) => {
          if (!examTypes.find(examType => examType.name === examGrade.examType)) {
            examTypes.push({
              name: examGrade.examType,
              rank: examGrade.examTypeRank,
            });
          }

          acc[examGrade.examType] = examGrade.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>),
        studentAverage: subject.calculateStudentAverage(student._id).format(),
        studentRank: subject.calculateStudentRank(student._id),
        teacherName: subject.teacher?.fullName || null,
        teacherObservation: subject.findStudentObservation(student._id),
      });
    }

    for (const group of classGrades.findGroupsOfStudent(student._id)) {
      subjects.push({
        name: group.name,
        coefficient: group.coefficient,
        studentAverage: group.calculateStudentAverage(student._id).format(),
        studentRank: group.calculateStudentRank(student._id),
        teacherName: group.teacher?.fullName || null,
        teacherObservation: group.findStudentObservation(student._id),
        grades: group.examGrades.reduce((acc, examGrade) => {
          if (!examTypes.find(examType => examType.name === examGrade.examType)) {
            examTypes.push({ name: examGrade.examType, rank: examGrade.examTypeRank });
          }

          acc[examGrade.examType] = examGrade.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>),
      });
    }

    const studentTermAverage = classGrades.calculateStudentAverage(student._id);

    const examNames = examTypes.sort((a, b) => a.rank - b.rank).map(exam => exam.name);

    const termAverages = allTermAverages.map(termAverage => ({
      termName: termAverage.termName,
      average: termAverage.average,
      rank: termAverage.rank,
      diplomaName: termAverage.diplomaName,
    }));

    if (annualAverage !== null && annualRank !== null)
      termAverages.push({
        termName: translate("term.annual", "ar") as string,
        average: annualAverage,
        rank: annualRank,
        diplomaName: null,
      });

    return {
      examGradeSystem: level.examGradeSystem,
      student: {
        _id: student._id,
        newId: student.newId,
        fullName: student.fullName,
        className: classGrades.class.name,
        uniqueId: student.uniqueId,
      },
      examNames,
      school: {
        _id: school._id,
        name: school.name,
        address: school.address,
        email: school.email,
        phoneNumber: school.phoneNumber,
        establishmentTitle: level.establishmentTitle || ESTABLISHMENT_TITLE_ENUM.PRIVATE_SECONDARY,
        educationDepartment: school.educationDepartment,
        schoolYearName: level.currentSchoolYear.name,
        termName: term.name,
        totalNumberOfStudents: classGrades.studentIds.length,
        directorName: school.directorName,
      },
      gradeReport: {
        studentAverage: studentTermAverage.format(),
        studentRank: classGrades.calculateStudentRank(student._id),
        subjects,
        studentDiploma: allTermAverages.find(termAverage => termAverage.termName === term.name)!
          .diplomaName,
      },
      termAverages,
      promotionStatus,
    };
  }
}
