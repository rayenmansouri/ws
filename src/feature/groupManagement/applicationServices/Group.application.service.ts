import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { Populate } from "../../../core/populateTypes";
import { Group, GroupMetaData } from "../domains/group.entity";
import { GroupRepo } from "../repos/Group.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { Student } from "../../students/domain/student.entity";
import { GroupService } from "../domains/Group.service";
import { Term } from "../../terms/domains/term.entity";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ExamGrade, TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { GradeBookObservation } from "../../gradeBookObservation/gradeBookObservation.entity";
import { InternalError } from "../../../core/ApplicationErrors";

@injectable()
export class GroupApplicationService {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}
  async getTeacherGroups(teacher: Teacher): Promise<Populate<GroupMetaData, "classTypes">[]> {
    const teacherLevelIds = teacher.levels;

    const levels = await this.levelRepo.findManyByIds(teacherLevelIds);

    const currentSchoolYearIds = levels.map(level => level.currentSchoolYear._id);

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      currentSchoolYearIds,
    );

    const groupIds = teacherProfiles.flatMap(teacherProfile => teacherProfile.groups);

    const groups = await this.groupRepo.findManyByIds(groupIds, {
      populate: ["classTypes"],
    });

    return groups;
  }

  async addStudentExamGradeAndGradeBookObservationOfGroup(
    students: Student[],
    group: Group,
  ): Promise<void> {
    if (!GroupService.isIncludedInGradeBook(group)) return;

    const studentIds = students.map(student => student._id);

    await this.examGradeRepo.markStudentExamDegreeAsDispensedForGroup(
      { groupId: group._id },
      studentIds,
    );

    await this.gradeBookObservationRepo.addStudentsToGradeBookObservationOfGroup(
      group._id,
      studentIds,
    );
  }

  async createGroupExamGradesAndObservations(
    students: Student[],
    group: Group,
    terms: Pick<Term, "_id">[],
  ): Promise<void> {
    if (!GroupService.isIncludedInGradeBook(group)) return;

    if (group.levels.length !== 1) throw new InternalError("Group must have one level");

    const examGradeToBeCreated: Omit<ExamGrade, keyof BaseEntity>[] = [];
    const gradeBookObservationToBeCreated: Omit<GradeBookObservation, keyof BaseEntity>[] = [];
    const studentRecord = {} as Record<ID, null>;
    students.forEach(student => {
      studentRecord[student._id] = null;
    });

    for (const exam of group.groupType.exams) {
      for (const term of terms) {
        examGradeToBeCreated.push({
          examType: exam.examType,
          term: term._id,
          degrees: studentRecord,
          topicId: group._id,
          topicType: TOPIC_TYPE_ENUM.GROUP,
          class: null,
        });
        gradeBookObservationToBeCreated.push({
          topicId: group._id,
          topicType: TOPIC_TYPE_ENUM.GROUP,
          class: null,
          term: term._id,
          observations: studentRecord,
          ibInvestments: studentRecord,
        });
      }
    }

    await this.gradeBookObservationRepo.addMany(gradeBookObservationToBeCreated);
    await this.examGradeRepo.addMany(examGradeToBeCreated);
  }

  async removeStudentsFromGroupExamGradeAndGradeBookObservation(
    students: Student[],
    group: Group,
  ): Promise<void> {
    if (!GroupService.isIncludedInGradeBook(group)) return;

    const studentIds = students.map(student => student._id);

    await this.examGradeRepo.removeStudentsFromExamGradeOfGroup(group._id, studentIds);
    await this.gradeBookObservationRepo.removeStudentsFromGradeBookObservationOfGroup(
      group._id,
      studentIds,
    );
  }
}
