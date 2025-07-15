import { SchoolYearMetaData } from "./../../schoolYears/domain/schoolYear.entity";
import { Populate } from "./../../../core/populateTypes";
import { SchoolYearDto } from "./../../schoolYears/dtos/schoolYear.dto";
import { SchoolYearMapper } from "./../../schoolYears/mappers/schoolYear.mapper";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TLanguageEnum } from "../../../translation/constants";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { TeacherPaymentConfigurationRepo } from "../../teacherPayment/domain/TeacherPaymentConfiguration.repo";
import { TeacherRepo } from "../domain/Teacher.repo";
import { TeacherProfileRepo } from "../domain/TeacherProfile.repo";
import { TeacherProfileDTO } from "../dtos/TeacherProfile.dto";
import { ID } from "./../../../types/BaseEntity";
import { Classroom } from "./../../classrooms/domains/classroom.entity";
import { ClassMapper } from "../../classes/mappers/Classes.mapper";

export type getTeacherProfileRequestDto = {
  teacherNewId: string;
  schoolYearId?: ID;
};
@injectable()
export class GetTeacherProfileUsecase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("Language") private language: TLanguageEnum,
    @inject("RoleRepo") private roleRepo: RoleRepo,
    @inject("ClassroomRepo") private readonly classroomRepo: ClassroomRepo,
    @inject("SchoolYearRepo") private readonly schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(dto: getTeacherProfileRequestDto): Promise<TeacherProfileDTO> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
      {
        populate: ["levels", "subjectTypes", "groupTypes"],
      },
    );

    const teacherRoles = await this.roleRepo.findManyByIds(teacher.roles);

    const oneOfTheCurrentTeacherSchoolYears: Populate<SchoolYearMetaData, "level"> =
      await this.schoolYearRepo.findOneByIdOrThrow(
        teacher.levels[0].currentSchoolYear._id,
        "notFound.schoolYear",
        {
          populate: ["level"],
        },
      );

    let selectedSchoolYear: SchoolYearDto = SchoolYearMapper.toSchoolYearDto(
      oneOfTheCurrentTeacherSchoolYears,
    );

    if (dto.schoolYearId) {
      const schoolYear = await this.schoolYearRepo.findOneByIdOrThrow(
        dto.schoolYearId,
        "notFound.schoolYear",
        {
          populate: ["level"],
        },
      );

      selectedSchoolYear = SchoolYearMapper.toSchoolYearDto(schoolYear);
    }

    const schoolYearIds = dto.schoolYearId ? [dto.schoolYearId] : [selectedSchoolYear._id];

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      schoolYearIds,
    );

    const teacherPaymentConfiguration =
      await this.teacherPaymentConfigurationRepo.findOneByTeacherId(teacher._id);

    const classIds = teacherProfiles.flatMap(profile => profile.classes);

    const classes = await this.classRepo.findManyByIds(classIds);

    const preferredClassroom: Classroom | null = teacher.preferredClassroom
      ? await this.classroomRepo.findOneById(teacher.preferredClassroom)
      : null;

    const allTeacherProfiles = await this.teacherProfileRepo.getAllProfilesOfTeacher(teacher._id);
    const allTeacherSchoolYearsIds = allTeacherProfiles.map(
      teacherProfile => teacherProfile.schoolYear,
    );

    const schoolYears = await this.schoolYearRepo.findManyByIdsOrThrow(
      allTeacherSchoolYearsIds,
      "notFound.schoolYear",
      {
        populate: ["level"],
      },
    );

    return {
      _id: teacher._id,
      newId: teacher.newId,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      fullName: teacher.fullName,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      gender: teacher.gender,
      birthDate: teacher.birthDate,
      avatar: teacher.avatar.link,
      address1: teacher.address1,
      address2: teacher.address2,
      classes: classes.map(classDoc => ClassMapper.toClassDto(classDoc)),
      subjectTypes: teacher.subjectTypes.map(subjectType => EntityMapper.toEntityDto(subjectType)),
      groupTypes: teacher.groupTypes.map(groupType => EntityMapper.toEntityDto(groupType)),
      isPaymentConfigured: !!teacherPaymentConfiguration,
      topics: [...teacher.subjectTypes, ...teacher.groupTypes].map(topic =>
        EntityMapper.toEntityDto(topic),
      ),
      roles: teacherRoles.map(role => ({
        _id: role._id,
        newId: role.newId,
        name: role.translation[this.language],
      })),
      notAvailableTimes: teacher.notAvailableTimes,
      maxDaysPerWeek: teacher.maxDaysPerWeek,
      maxHoursPerDay: teacher.maxHoursPerDay,
      maxGapsPerDay: teacher.maxGapsPerDay,
      preferredClassroom: preferredClassroom
        ? {
            _id: preferredClassroom._id,
            newId: preferredClassroom.newId,
            name: preferredClassroom.name,
          }
        : null,
      levels: teacher.levels.map(level => ({
        _id: level._id,
        newId: level.newId,
        name: level.name,
      })),
      schoolYears: schoolYears.map(schoolYear => SchoolYearMapper.toSchoolYearDto(schoolYear)),
      selectedSchoolYear: selectedSchoolYear,
    };
  }
}
