import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { Class } from "./class.entity";
import { ClassRepo } from "./Class.repo";
import { Student } from "../../students/domain/student.entity";
import { ClassGroup } from "./classGroup.entity";
import logger from "../../../core/Logger";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { StudentProfile } from "../../students/domain/studentProfile.entity";
import { ID } from "../../../types/BaseEntity";
import { Term } from "../../terms/domains/term.entity";

@injectable()
export class ClassService {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async getTeacherClasses(teacher: Teacher): Promise<Class[]> {
    const teacherLevelIds = teacher.levels;

    const levels = await this.levelRepo.findManyByIds(teacherLevelIds);

    const currentSchoolYearIds = levels.map(level => level.currentSchoolYear._id);

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      currentSchoolYearIds,
    );

    const classIds = teacherProfiles.flatMap(teacherProfile => teacherProfile.classes);

    const classDocs = await this.classRepo.findManyByIds(classIds);

    return classDocs;
  }

  static getEachStudentThereGroup(
    students: Student[],
    group: ClassGroup[],
  ): { student: Student; group: ClassGroup }[] {
    return students.map(student => {
      const studentGroup = group.find(group => group.students.includes(student._id));
      if (!studentGroup) logger.warn(`Student ${student._id} is not in any group`);

      return { student, group: studentGroup! };
    });
  }

  static checkClassCapacity(
    classType: Pick<ClassType, "capacity">,
    classDoc: Pick<Class, "students">,
    newStudents: Pick<Student, "_id">[],
  ): void {
    const totalStudentNumber = classDoc.students.length + newStudents.length;
    if (classType.capacity && totalStudentNumber > classType.capacity) {
      throw new BadRequestError("class.maxStudentReached");
    }
  }

  static checkStudentNotIncludeInClass(studentProfiles: Pick<StudentProfile, "class">[]): void {
    if (studentProfiles.some(studentProfile => !!studentProfile.class)) {
      throw new BadRequestError("student.alreadyInClass");
    }
  }

  static checkStudentIncludeInClass(
    students: Pick<Student, "_id">[],
    classDoc: Pick<Class, "students">,
  ): void {
    const studentIds = students.map(student => student._id);
    const classStudentIds = classDoc.students.map(student => student);
    const isSomeStudentNotInClass = studentIds.some(
      studentId => !classStudentIds.includes(studentId),
    );
    if (isSomeStudentNotInClass) {
      throw new BadRequestError("student.alreadyInClass");
    }
  }

  static validateStudentsClassType(
    students: Pick<Student, "classType">[],
    classDoc: Pick<Class, "classType">,
  ): void {
    const studentsClassType = students.map(student => student.classType);
    const classTypeOfClass = classDoc.classType;
    const isEveryStudentCompatibleWithClassTypeOfClass = studentsClassType.every(
      studentClassType => studentClassType === classTypeOfClass,
    );

    if (!isEveryStudentCompatibleWithClassTypeOfClass) {
      throw new BadRequestError("student.classTypeDoesNotMatch");
    }
  }
  static countTeachers(
    classDocs: Pick<Class, "subjectTeacherMap" | "subSubjectTeacherMap">[],
  ): number {
    const subjectTeachers = classDocs
      .flatMap(doc => Object.values(doc.subjectTeacherMap))
      .filter(teacherId => teacherId !== null);
    const subSubjectTeachers = classDocs
      .flatMap(doc => Object.values(doc.subSubjectTeacherMap))
      .filter(teacherId => teacherId !== null);

    return new Set([...subjectTeachers, ...subSubjectTeachers]).size;
  }

  static countStudents(classDocs: Pick<Class, "students">[]): number {
    return classDocs.reduce((acc, classDoc) => acc + classDoc.students.length, 0);
  }

  static getDistinctStudentIdsFromDifferentClass(
    classDocs: Pick<Class, "students">[],
    maxStudentInClass: number,
  ): ID[] {
    const studentIds = Array.from(
      new Set(classDocs.flatMap(classDoc => classDoc.students.slice(0, maxStudentInClass))),
    );
    return studentIds;
  }

  static getDistinctTeacherIdsFromDifferentClass(
    classDocs: Pick<Class, "subjectTeacherMap" | "subSubjectTeacherMap">[],
    maxTeacher: number,
  ): ID[] {
    const topicTeachers = classDocs.flatMap(doc => {
      const subjectTeachers = Object.values(doc.subjectTeacherMap);
      const subSubjectTeachers = Object.values(doc.subSubjectTeacherMap);
      const teacherIds = [...subjectTeachers, ...subSubjectTeachers].filter(
        teacherId => teacherId !== null,
      );
      return Array.from(new Set(teacherIds)).slice(0, maxTeacher);
    });

    return topicTeachers;
  }

  static ensureStudentsInClass(students: Student[], classDoc: Class): void {
    const studentIds = students.map(student => student._id);
    const isEveryStudentInClass = studentIds.every(studentId =>
      classDoc.students.includes(studentId),
    );

    if (!isEveryStudentInClass) {
      throw new BadRequestError("student.notInClass");
    }
  }

  static excludeRemovedStudents(data: { studentIds: ID[]; studentToRemoveIds: ID[] }): ID[] {
    const { studentToRemoveIds, studentIds } = data;
    const remainingStudents = studentIds.filter(
      studentId => !studentToRemoveIds.includes(studentId),
    );

    return remainingStudents;
  }

  static checkTeacherStillTeachingInClass(
    teacherId: ID,
    classDoc: Pick<Class, "subjectTeacherMap" | "subSubjectTeacherMap">,
  ): boolean {
    const topicTeachers = Object.values({
      ...classDoc.subjectTeacherMap,
      ...classDoc.subSubjectTeacherMap,
    }).filter(teacherId => teacherId !== null);

    return topicTeachers.some(teacher => teacher.toString() === teacherId.toString());
  }

  static ensureTeacherCanBeRemovedFromSubSubjectClass(subSubjectTypeId: ID, classDoc: Class): ID {
    const teacherId = classDoc.subSubjectTeacherMap[subSubjectTypeId];

    if (teacherId === undefined) throw new NotFoundError("notFound.teacher");

    if (teacherId === null) throw new NotFoundError("class.noTeacherAssigned");
    return teacherId;
  }

  static ensureTeacherCanBeRemovedFromSubjectClass(subjectTypeId: ID, classDoc: Class): ID {
    const teacherId = classDoc.subjectTeacherMap[subjectTypeId];

    if (teacherId === undefined) throw new NotFoundError("notFound.teacher");

    if (teacherId === null) throw new NotFoundError("class.noTeacherAssigned");

    return teacherId;
  }

  static findPublishedTerm(terms: Term[], classDoc: Pick<Class, "gradeReports">): Term | null {
    const publishedTerm = classDoc.gradeReports.find(report => report.isPublished)?.term;
    if (!publishedTerm) return null;
    const term = terms.find(term => term._id === publishedTerm);
    if (!term) return null;
    return term;
  }
}
