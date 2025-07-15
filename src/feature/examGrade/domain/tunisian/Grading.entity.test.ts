import { ID } from "../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";
import { ExamGrades } from "./ExamGrades.entity";
import { Grade } from "./Grade.valueobject";
import { GradingEntity } from "./Grading.entity";

describe("GradingEntity", () => {
  describe("calculateStudentAverage", () => {
    it("should return the average of the topic", () => {
      const studentId = "studentId1" as ID;

      const examGrade1 = new ExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        coefficient: 1,
        studentGrades: [{ studentId, grade: Grade.create(1, 10) }],
        examGradeId: "examGradeId1" as ID,
      });

      const examGrade2 = new ExamGrades({
        examType: "examType2",
        examTypeRank: 2,
        coefficient: 2,
        studentGrades: [{ studentId, grade: Grade.create(2, 15) }],
        examGradeId: "examGradeId2" as ID,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [examGrade1, examGrade2],
        studentIds: [studentId],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      const average = topic.calculateStudentAverage(studentId);

      expect(average.mark).toBe(13.33);
    });

    it("should return the average of the topic with subtopics", () => {
      const studentId = "studentId1" as ID;

      const examGrade1 = new ExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        coefficient: 1,
        studentGrades: [{ studentId, grade: Grade.create(1, 10) }],
        examGradeId: "examGradeId1" as ID,
      });

      const examGrade2 = new ExamGrades({
        examType: "examType2",
        examTypeRank: 2,
        coefficient: 2,
        studentGrades: [{ studentId, grade: Grade.create(2, 17) }],
        examGradeId: "examGradeId2" as ID,
      });

      const examGrade3 = new ExamGrades({
        examType: "examType3",
        examTypeRank: 3,
        coefficient: 3,
        studentGrades: [{ studentId, grade: Grade.create(3, 12) }],
        examGradeId: "examGradeId3" as ID,
      });

      // average is 14.66
      const subTopic1 = new GradingEntity({
        name: "subTopic1",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [examGrade1, examGrade2],
        studentIds: [studentId],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      // average is 11.5
      const subTopic2 = new GradingEntity({
        name: "subTopic2",
        newId: "",
        coefficient: 2,
        subTopics: [],
        examGrades: [examGrade1, examGrade3],
        studentIds: [studentId],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [subTopic1, subTopic2],
        examGrades: [],
        studentIds: [studentId],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      const average = topic.calculateStudentAverage(studentId);

      expect(average.mark).toBe(12.55);
    });
  });

  describe("calculateStudentRank", () => {
    it("should return the rank of the student", () => {
      const studentId1 = "studentId1" as ID;
      const studentId2 = "studentId2" as ID;
      const studentId3 = "studentId3" as ID;

      const Grade1 = Grade.create(1, 10);
      const Grade2 = Grade.create(1, 15);
      const Grade3 = Grade.create(1, 12);

      const examGrade1 = new ExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        coefficient: 1,
        studentGrades: [
          { studentId: studentId1, grade: Grade1 },
          { studentId: studentId2, grade: Grade2 },
          { studentId: studentId3, grade: Grade3 },
        ],
        examGradeId: "examGradeId1" as ID,
      });

      const examGrade2 = new ExamGrades({
        examType: "examType2",
        examTypeRank: 2,
        coefficient: 1,
        studentGrades: [
          { studentId: studentId1, grade: Grade1 },
          { studentId: studentId2, grade: Grade2 },
          { studentId: studentId3, grade: Grade3 },
        ],
        examGradeId: "examGradeId2" as ID,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [examGrade1, examGrade2],
        studentIds: [studentId1, studentId2, studentId3],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.calculateStudentRank(studentId1)).toBe(3);
      expect(topic.calculateStudentRank(studentId2)).toBe(1);
      expect(topic.calculateStudentRank(studentId3)).toBe(2);
    });
  });

  describe("calculateHighestAverage", () => {
    it("should return the highest average", () => {
      const studentId = "studentId1" as ID;
      const studentId2 = "studentId2" as ID;
      const studentId3 = "studentId3" as ID;

      const examGrade1 = new ExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        coefficient: 1,
        studentGrades: [
          { studentId, grade: Grade.create(1, 10) },
          { studentId: studentId2, grade: Grade.create(1, 15) },
          { studentId: studentId3, grade: Grade.create(1, 12) },
        ],
        examGradeId: "examGradeId1" as ID,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [examGrade1],
        studentIds: [studentId, studentId2, studentId3],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.calculateHighestAverage()?.mark).toBe(15);
    });

    it("should return grade with null mark if there is no average", () => {
      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [],
        studentIds: [],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.calculateHighestAverage().mark).toBeNull();
    });
  });

  describe("calculateLowestAverage", () => {
    it("should return the lowest average", () => {
      const studentId = "studentId1" as ID;
      const studentId2 = "studentId2" as ID;
      const studentId3 = "studentId3" as ID;

      const examGrade1 = new ExamGrades({
        examType: "examType1",
        examTypeRank: 1,
        coefficient: 1,
        studentGrades: [
          { studentId, grade: Grade.create(1, 10) },
          { studentId: studentId2, grade: Grade.create(1, 15) },
          { studentId: studentId3, grade: Grade.create(1, 12) },
        ],
        examGradeId: "examGradeId1" as ID,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [examGrade1],
        studentIds: [studentId, studentId2, studentId3],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.calculateLowestAverage()?.mark).toBe(10);
    });

    it("should return grade with null mark if there is no average", () => {
      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [],
        studentIds: [],
        teacher: null,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.calculateLowestAverage().mark).toBeNull();
    });
  });

  describe("getDegreesCoverage", () => {
    describe("without sub topics", () => {
      it("should count the students who have grades in all exams", () => {
        const examGrade1 = new ExamGrades({
          examType: "examType1",
          examTypeRank: 1,
          coefficient: 1,
          studentGrades: [{ studentId: "studentId1" as ID, grade: Grade.create(1, 10) }],
          examGradeId: "examGradeId1" as ID,
        });

        const examGrade2 = new ExamGrades({
          examType: "examType2",
          examTypeRank: 1,
          coefficient: 1,
          studentGrades: [{ studentId: "studentId1" as ID, grade: Grade.create(1, 10) }],
          examGradeId: "examGradeId2" as ID,
        });

        const topic = new GradingEntity({
          name: "topic",
          newId: "",
          coefficient: 1,
          subTopics: [],
          examGrades: [examGrade1, examGrade2],
          studentIds: ["studentId1" as ID],
          teacher: null,
          teacherObservations: [],
          gradeBookObservationId: null,
        });

        expect(topic.getDegreesCoverage()).toBe(1);
      });

      it("should not count the students who doesn't have grades in all exams", () => {
        const examGrade1 = new ExamGrades({
          examType: "examType1",
          coefficient: 1,
          examTypeRank: 1,
          studentGrades: [{ studentId: "studentId1" as ID, grade: Grade.create(1, 10) }],
          examGradeId: "examGradeId1" as ID,
        });

        const examGrade2 = new ExamGrades({
          examType: "examType2",
          coefficient: 1,
          examTypeRank: 1,
          studentGrades: [{ studentId: "studentId1" as ID, grade: Grade.create(1, null) }],
          examGradeId: "examGradeId2" as ID,
        });

        const topic = new GradingEntity({
          name: "topic",
          newId: "",
          coefficient: 1,
          subTopics: [],
          examGrades: [examGrade1, examGrade2],
          studentIds: ["studentId1" as ID],
          teacher: null,
          teacherObservations: [],
          gradeBookObservationId: null,
        });

        expect(topic.getDegreesCoverage()).toBe(0);
      });

      it("should count a dispensed grade as a valid grade", () => {
        const examGrade1 = new ExamGrades({
          examType: "examType1",
          coefficient: 1,
          examTypeRank: 1,
          studentGrades: [{ studentId: "studentId1" as ID, grade: Grade.create(1, "-") }],
          examGradeId: "examGradeId1" as ID,
        });

        const examGrade2 = new ExamGrades({
          examType: "examType2",
          coefficient: 1,
          examTypeRank: 1,
          studentGrades: [{ studentId: "studentId1" as ID, grade: Grade.create(1, "-") }],
          examGradeId: "examGradeId2" as ID,
        });

        const topic = new GradingEntity({
          name: "topic",
          newId: "",
          coefficient: 1,
          subTopics: [],
          examGrades: [examGrade1, examGrade2],
          studentIds: ["studentId1" as ID],
          teacher: null,
          teacherObservations: [],
          gradeBookObservationId: null,
        });

        expect(topic.getDegreesCoverage()).toBe(1);
      });
    });

    describe("with sub topics", () => {
      it("return the lowest coverage of the sub topics", () => {
        const examGrade1 = new ExamGrades({
          examType: "examType1",
          coefficient: 1,
          examTypeRank: 1,
          studentGrades: [
            { studentId: "studentId1" as ID, grade: Grade.create(1, 10) },
            { studentId: "studentId2" as ID, grade: Grade.create(1, 10) },
          ],
          examGradeId: "examGradeId1" as ID,
        });

        const subTopic1 = new GradingEntity({
          name: "subTopic1",
          newId: "",
          coefficient: 1,
          subTopics: [],
          examGrades: [examGrade1],
          studentIds: ["studentId1" as ID, "studentId2" as ID],
          teacher: null,
          teacherObservations: [],
          gradeBookObservationId: null,
        });

        const examGrade2 = new ExamGrades({
          examType: "examType2",
          coefficient: 1,
          examTypeRank: 1,

          studentGrades: [
            { studentId: "studentId1" as ID, grade: Grade.create(1, 10) },
            { studentId: "studentId2" as ID, grade: Grade.create(1, null) },
          ],
          examGradeId: "examGradeId2" as ID,
        });

        const subTopic2 = new GradingEntity({
          name: "subTopic2",
          newId: "",
          coefficient: 1,
          subTopics: [],
          examGrades: [examGrade2],
          studentIds: ["studentId1" as ID, "studentId2" as ID],
          teacher: null,
          teacherObservations: [],
          gradeBookObservationId: null,
        });

        const topic = new GradingEntity({
          name: "topic",
          newId: "",
          coefficient: 1,
          subTopics: [subTopic1, subTopic2],
          examGrades: [],
          studentIds: ["studentId1" as ID, "studentId2" as ID],
          teacher: null,
          teacherObservations: [],
          gradeBookObservationId: null,
        });

        expect(topic.getDegreesCoverage()).toBe(1);
      });
    });
  });

  describe("getTeachers", () => {
    it("should return the teachers of the topic", () => {
      const teacher1: UserProfileDTO = {
        _id: "teacherId1" as ID,
        fullName: "Teacher Name 1",
        newId: "teacherId1",
        avatar: "avatar1",
        email: "teacher1@example.com",
        phoneNumber: "1234567890",
      };

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [],
        studentIds: [],
        teacher: teacher1,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.getTeachers()).toEqual([teacher1]);
    });

    it("should return the teachers of the sub topics", () => {
      const teacher1: UserProfileDTO = {
        _id: "teacherId1" as ID,
        fullName: "Teacher Name 1",
        newId: "teacherId1",
        avatar: "avatar1",
        email: "teacher1@example.com",
        phoneNumber: "1234567890",
      };

      const teacher2: UserProfileDTO = {
        _id: "teacherId2" as ID,
        fullName: "Teacher Name 2",
        newId: "teacherId2",
        avatar: "avatar2",
        email: "teacher2@example.com",
        phoneNumber: "1234567890",
      };

      const subTopic1 = new GradingEntity({
        name: "subTopic1",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [],
        studentIds: [],
        teacher: teacher1,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [subTopic1],
        examGrades: [],
        studentIds: [],
        teacher: teacher2,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.getTeachers()).toEqual([teacher2, teacher1]);
    });

    it("Should not return duplicate teachers", () => {
      const teacher1: UserProfileDTO = {
        _id: "teacherId1" as ID,
        fullName: "Teacher Name 1",
        newId: "teacherId1",
        avatar: "avatar1",
        email: "teacher1@example.com",
        phoneNumber: "1234567890",
      };

      const subTopic1 = new GradingEntity({
        name: "subTopic1",
        newId: "",
        coefficient: 1,
        subTopics: [],
        examGrades: [],
        studentIds: [],
        teacher: teacher1,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      const topic = new GradingEntity({
        name: "topic",
        newId: "",
        coefficient: 1,
        subTopics: [subTopic1],
        examGrades: [],
        studentIds: [],
        teacher: teacher1,
        teacherObservations: [],
        gradeBookObservationId: null,
      });

      expect(topic.getTeachers()).toEqual([teacher1]);
    });
  });
});
