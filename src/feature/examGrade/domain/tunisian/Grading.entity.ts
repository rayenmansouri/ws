import { ID } from "../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";
import { ExamGrades } from "./ExamGrades.entity";
import { Grade } from "./Grade.valueobject";

export class GradingEntity {
  name: string;
  newId: string;
  coefficient: number;
  subTopics: GradingEntity[];
  examGrades: ExamGrades[];
  studentIds: ID[];
  teacher: UserProfileDTO | null;
  gradeBookObservationId: ID | null;
  teacherObservations: {
    studentId: ID;
    observation: string | null;
  }[];

  constructor({
    name,
    newId,
    coefficient,
    subTopics,
    examGrades,
    studentIds,
    teacher,
    teacherObservations,
    gradeBookObservationId,
  }: {
    name: string;
    newId: string;
    coefficient: number;
    subTopics: GradingEntity[];
    examGrades: ExamGrades[];
    studentIds: ID[];
    teacher: UserProfileDTO | null;
    teacherObservations: {
      studentId: ID;
      observation: string | null;
    }[];
    gradeBookObservationId: ID | null;
  }) {
    this.name = name;
    this.newId = newId;
    this.coefficient = coefficient;
    this.subTopics = subTopics;
    this.examGrades = examGrades;
    this.studentIds = studentIds;
    this.teacher = teacher;
    this.teacherObservations = teacherObservations;
    this.gradeBookObservationId = gradeBookObservationId;
  }

  calculateStudentAverage(studentId: ID): Grade {
    const hasSubTopics = this.subTopics.length > 0;

    if (hasSubTopics) {
      const subTopicsAverage = this.subTopics.map(subTopic =>
        subTopic.calculateStudentAverage(studentId),
      );

      return Grade.calculateAverage(subTopicsAverage, this.coefficient);
    }

    const studentGrades = this.examGrades.map(examGrade => examGrade.findStudentGrade(studentId));

    const studentAverage = Grade.calculateAverage(studentGrades, this.coefficient);

    return studentAverage;
  }

  calculateStudentRank(studentId: ID): number | null {
    const studentAverages: {
      id: ID;
      grade: Grade;
    }[] = [];

    for (const id of this.studentIds) {
      const studentAverage = this.calculateStudentAverage(id);

      studentAverages.push({ id, grade: studentAverage });
    }

    const rank = Grade.calculateRank(studentAverages, studentId);

    return rank;
  }

  calculateHighestAverage(): Grade {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => b - a);

    return Grade.create(this.coefficient, sortedAverages[0] ?? null);
  }

  calculateLowestAverage(): Grade {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => a - b);

    return Grade.create(this.coefficient, sortedAverages[0] ?? null);
  }

  findStudentObservation(studentId: ID): string | null {
    const observation = this.teacherObservations.find(
      observation => observation.studentId === studentId,
    )?.observation;

    if (observation === undefined) throw new Error("global.internalError");

    return observation;
  }

  getTotalAverage(): Grade {
    const studentAverages = this.studentIds.map(studentId =>
      this.calculateStudentAverage(studentId),
    );

    return Grade.calculateAverage(studentAverages, this.coefficient);
  }

  calculateAvgAbove10(): {
    number: number;
    percentage: string;
  } {
    if (this.studentIds.length === 0) return { number: 0, percentage: "0%" };

    const studentAveragesAbove10 = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .filter(average => average.mark !== null && average.mark >= 10);

    const totalStudent = this.studentIds.length;
    const totalStudentAbove10 = studentAveragesAbove10.length;

    return {
      number: totalStudentAbove10,
      percentage: `${Math.trunc((totalStudentAbove10 / totalStudent) * 100)}%`,
    };
  }

  calculateAvgBelow10(): {
    number: number;
    percentage: string;
  } {
    if (this.studentIds.length === 0) return { number: 0, percentage: "0%" };

    const studentAveragesBelow10 = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .filter(average => average.mark !== null && average.mark < 10);

    const totalStudent = this.studentIds.length;
    const totalStudentBelow10 = studentAveragesBelow10.length;

    return {
      number: totalStudentBelow10,
      percentage: `${Math.trunc((totalStudentBelow10 / totalStudent) * 100)}%`,
    };
  }

  getDegreesCoverage(): number {
    if (this.subTopics.length === 0) {
      let studentsWithAllGrades = 0;

      for (const studentId of this.studentIds) {
        const hasAllGrades = this.examGrades.every(examGrade => {
          const studentGrade = examGrade.findStudentGrade(studentId);

          return studentGrade.mark !== null || studentGrade.isDispensed;
        });

        if (hasAllGrades) studentsWithAllGrades++;
      }

      return studentsWithAllGrades;
    }

    const subTopicsCoverage = this.subTopics.map(subTopic => subTopic.getDegreesCoverage());
    return Math.min(...subTopicsCoverage);
  }

  getTeachers(): UserProfileDTO[] {
    const teachers: UserProfileDTO[] = [];

    if (this.teacher) teachers.push(this.teacher);

    for (const subTopic of this.subTopics) {
      const subTopicTeachers = subTopic.getTeachers();

      for (const subTopicTeacher of subTopicTeachers) {
        if (teachers.every(teacher => teacher._id !== subTopicTeacher._id))
          teachers.push(subTopicTeacher);
      }
    }

    return teachers;
  }
}
