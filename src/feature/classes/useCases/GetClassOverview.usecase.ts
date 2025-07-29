import { Classroom } from "./../../classrooms/domains/classroom.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { ClassOverviewDTO } from "../dto/ClassOverview.dto";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { translate } from "../../../translation/helper/translate";
import { TLanguageEnum } from "../../../translation/constants";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";

@injectable()
export class GetClassOverviewUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassroomRepo") private readonly classroomRepo: ClassroomRepo,
  ) {}

  async execute({
    classNewId,
    userId,
    userType,
    language,
  }: {
    classNewId: string;
    userId: ID;
    userType: string;
    language: TLanguageEnum;
  }): Promise<ClassOverviewDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "classType", "classGroups"],
    });
    const levelDoc = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );

    if (userType === END_USER_ENUM.TEACHER) {
      const teachersOfClass = [
        ...Object.values(classDoc.subjectTeacherMap),
        ...Object.values(classDoc.subSubjectTeacherMap),
      ];

      const isTeacherOfClass = teachersOfClass.includes(userId);
      if (!isTeacherOfClass) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    const preferredClassroom: Classroom | null = classDoc.preferredClassroom
      ? await this.classroomRepo.findOneById(classDoc.preferredClassroom)
      : null;
    const result: ClassOverviewDTO = {
      classGroups: classDoc.classGroups.map(EntityMapper.toEntityDto),
      classType: EntityMapper.toEntityDto(classDoc.classType),
      classId: classDoc._id,
      classNewId: classDoc.newId,
      className: classDoc.name,
      levelId: levelDoc._id,
      schoolYearId: classDoc.schoolYear._id,
      examGradeSystem: levelDoc.examGradeSystem,
      notAvailableTimes: classDoc.notAvailableTimes,
      maxContinuousHours: classDoc.maxContinuousHours,
      maxHoursPerDay: classDoc.maxHoursPerDay,
      maxGapsPerDay: classDoc.maxGapsPerDay,
      preferredClassroom: preferredClassroom
        ? {
            _id: preferredClassroom?._id,
            newId: preferredClassroom.newId,
            name: preferredClassroom.name,
          }
        : null,
    };

    return result;
  }
}
