import { ID } from "../../../../types/BaseEntity";
import { CambridgeExamGrades } from "./CambridgeExamGrades.entity";
import { CambridgeGradingEntity } from "./CambridgeGrading.entity";
import { CambridgeGrade } from "./CambridgeGrade.valueobject";

describe("CambridgeGradingEntity", () => {
  describe("calculateStudentAverage", () => {
    it("should return the average of the topic", () => {
      const studentId = "studentId1" as ID;

      const examGrade1 = new CambridgeExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        examGradeId: "examGradeId1" as ID,
        coefficient: 1,
        studentGrades: [{ studentId, grade: CambridgeGrade.create(1, 10) }],
      });

      const examGrade2 = new CambridgeExamGrades({
        examType: "examType2",
        examTypeRank: 2,
        examGradeId: "examGradeId2" as ID,
        coefficient: 2,
        studentGrades: [{ studentId, grade: CambridgeGrade.create(2, 15) }],
      });

      const topic = new CambridgeGradingEntity({
        name: "topic",
        newId: "topicId",
        coefficient: 1,
        examGrades: [examGrade1, examGrade2],
        studentIds: [studentId],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: "gradeBookObservationId" as ID,
      });

      const average = topic.calculateStudentAverage(studentId);

      expect(average.mark).toBe(13);
    });
  });

  describe("calculateStudentRank", () => {
    it("should return the rank of the student", () => {
      const studentId1 = "studentId1" as ID;
      const studentId2 = "studentId2" as ID;
      const studentId3 = "studentId3" as ID;

      const Grade1 = CambridgeGrade.create(1, 10);
      const Grade2 = CambridgeGrade.create(1, 15);
      const Grade3 = CambridgeGrade.create(1, 12);

      const examGrade1 = new CambridgeExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        examGradeId: "examGradeId1" as ID,
        coefficient: 1,
        studentGrades: [
          { studentId: studentId1, grade: Grade1 },
          { studentId: studentId2, grade: Grade2 },
          { studentId: studentId3, grade: Grade3 },
        ],
      });

      const examGrade2 = new CambridgeExamGrades({
        examType: "examType2",
        examTypeRank: 1,
        examGradeId: "examGradeId2" as ID,
        coefficient: 2,
        studentGrades: [
          { studentId: studentId1, grade: Grade1 },
          { studentId: studentId2, grade: Grade2 },
          { studentId: studentId3, grade: Grade3 },
        ],
      });

      const topic = new CambridgeGradingEntity({
        name: "topic",
        newId: "topicId",
        coefficient: 1,
        examGrades: [examGrade1, examGrade2],
        studentIds: [studentId1, studentId2, studentId3],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: "gradeBookObservationId" as ID,
      });

      expect(topic.calculateStudentRank(studentId1)).toBe(3);
      expect(topic.calculateStudentRank(studentId2)).toBe(1);
      expect(topic.calculateStudentRank(studentId3)).toBe(2);
    });
  });
});
