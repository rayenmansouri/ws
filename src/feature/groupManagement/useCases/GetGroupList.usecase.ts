import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { UserMapper } from "../../users/mappers/User.mapper";
import { GroupType } from "../domains/groupType.entity";
import { GroupRepo } from "../repos/Group.repo";
import { GroupTypeRepo } from "../repos/GroupType.repo";
import { GetGroupsSummaryResponse } from "./../../../api/groups/web/admin/getGroupList/getGroupList.types";
import { InternalError } from "./../../../core/ApplicationErrors";
import { Populate } from "./../../../core/populateTypes";
import { ID } from "./../../../types/BaseEntity";
import { LevelMetaData } from "./../../levels/domains/level.entity";
import { SchoolYear, SchoolYearMetaData } from "./../../schoolYears/domain/schoolYear.entity";
import { SchoolYearDto } from "./../../schoolYears/dtos/schoolYear.dto";
import { SchoolYearMapper } from "./../../schoolYears/mappers/schoolYear.mapper";
import { GroupMetaData } from "./../domains/group.entity";

export type getGroupListRequestDto = {
  groupTypeNewId?: string;
  schoolYearId?: ID;
};

@injectable()
export class GetGroupListUseCase {
  constructor(
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(dto: getGroupListRequestDto): Promise<GetGroupsSummaryResponse> {
    const levels: Populate<LevelMetaData, "currentSchoolYear.level">[] =
      await this.levelRepo.findAll({
        populate: ["currentSchoolYear.level"],
      });

    const groupTypes = await this.groupTypeRepo.findAll();
    const MAX_DISPLAYED_STUDENTS = 4;

    const selectedGroupType = (groupTypes.find(
      groupType => groupType.newId === dto.groupTypeNewId,
    ) || groupTypes[0]) as GroupType | undefined;

    if (!selectedGroupType)
      return {
        selectedGroupType: null,
        groupTypes: [],
        groupLists: [],
        schoolYears: [],
        selectedSchoolYear: null,
      };

    const allGroups = await this.groupRepo.findManyByGroupTypes([selectedGroupType?._id], {
      populate: ["teacher", "students", "classTypes", "levels", "schoolYears"],
    });

    let groups: Populate<
      GroupMetaData,
      "teacher" | "students" | "classTypes" | "levels" | "schoolYears"
    >[];

    let selectedSchoolYear: SchoolYearDto;

    if (dto.schoolYearId) {
      const schoolYearDoc = await this.schoolYearRepo.findOneByIdOrThrow(
        dto.schoolYearId,
        "notFound.schoolYear",
        {
          populate: ["level"],
        },
      );

      selectedSchoolYear = SchoolYearMapper.toSchoolYearDto(schoolYearDoc);

      groups = allGroups.filter(group => {
        const schoolYearsOfGroup: ID[] = group.schoolYears.map(schoolYear => schoolYear._id);
        return schoolYearsOfGroup.includes(dto.schoolYearId!);
      });
    } else {
      const currentLevelsSchoolYears: Populate<SchoolYearMetaData, "level">[] = levels.map(
        level => level.currentSchoolYear,
      );
      selectedSchoolYear = SchoolYearMapper.toSchoolYearDto(currentLevelsSchoolYears[0]);
      groups = allGroups.filter(group => {
        const schoolYearsOfGroup: ID[] = group.schoolYears.map(schoolYear => schoolYear._id);
        return schoolYearsOfGroup.includes(selectedSchoolYear._id);
      });
    }

    const selectedGroupTypeDto = EntityMapper.toEntityDto(selectedGroupType);
    const groupTypesDto = groupTypes.map(groupType => EntityMapper.toEntityDto(groupType));
    const groupLists = groups.map(group => {
      return {
        ...EntityMapper.toEntityDto(group),
        teacher: UserMapper.toUserProfileDTO(group.teacher),
        studentNumber: group.students.length,
        students: group.students
          .slice(0, MAX_DISPLAYED_STUDENTS)
          .map(student => UserMapper.toUserProfileDTO(student)),
        classTypes: group.classTypes.map(classType => EntityMapper.toEntityDto(classType)),
        levels: group.levels.map(level => EntityMapper.toEntityDto(level)),
      };
    });

    return {
      selectedGroupType: selectedGroupTypeDto,
      groupTypes: groupTypesDto,
      groupLists,
      schoolYears: this.formatSchoolYearsFromLevels(
        levels,
        allGroups.flatMap(group => group.schoolYears),
      ),
      selectedSchoolYear,
    };
  }

  private formatSchoolYearsFromLevels(
    levels: Populate<LevelMetaData, "currentSchoolYear.level">[],
    schoolYears: SchoolYear[],
  ): SchoolYearDto[] {
    const seen = new Set<string>();

    return schoolYears
      .filter(schoolYear => {
        const key = `${schoolYear._id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(schoolYear => {
        const matchedLevel = levels.find(level => level._id === schoolYear.level);
        if (!matchedLevel) throw new InternalError("notFound.level");

        return SchoolYearMapper.toSchoolYearDto({
          ...schoolYear,
          level: {
            ...matchedLevel,
            currentSchoolYear: {
              ...matchedLevel.currentSchoolYear,
              level: matchedLevel.currentSchoolYear._id,
            },
          },
        });
      });
  }
}
