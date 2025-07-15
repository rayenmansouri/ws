import { injectable } from "inversify/lib/inversify";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { ExamTypeRepo } from "../../examTypes/repos/examType.repo";
import { GroupService } from "../../groupManagement/domains/Group.service";
import { GroupType } from "../../groupManagement/domains/groupType.entity";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { GroupTypeService } from "../domains/GroupType.service";

type UpdateGroupTypeParams = Partial<{
  name: string;
  coefficient: number | null;
  exams: { examTypeNewId: string; coefficient: number }[];
  illustration: string;
}> & { groupTypeNewId: string };

@injectable()
export class UpdateGroupTypeUseCase {
  constructor(
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
  ) {}

  async execute(data: UpdateGroupTypeParams): Promise<void> {
    const { groupTypeNewId, name } = data;

    const groupType = await this.groupTypeRepo.findOneByNewIdOrThrow(
      groupTypeNewId,
      "notFound.groupType",
    );

    if (name && name !== groupType.name) {
      await this.groupTypeRepo.ensureFieldUniqueness("name", name, "alreadyUsed.name");
    }

    GroupTypeService.ensureGroupTypeHasExamWhenIncludeInGradeBook({
      coefficient: data.coefficient ?? groupType.coefficient,
      exams: data.exams || [],
    });

    const newExams = await this.getNewExamsOfGroupTypes(data.exams, groupType);

    GroupTypeService.ensureGroupTypeHasExamWhenIncludeInGradeBook({
      coefficient: data.coefficient ?? groupType.coefficient,
      exams: newExams,
    });

    const updatedGroupType = await this.groupTypeRepo.updateOneById(groupType._id, {
      name: data.name ?? groupType.name,
      coefficient: data.coefficient ?? groupType.coefficient,
      exams: newExams,
      illustration: data.illustration,
    });

    await this.groupRepo.updateManyByGroupType(groupType._id, {
      groupType: updatedGroupType!,
    });
  }

  private async getNewExamsOfGroupTypes(
    newExams: { examTypeNewId: string; coefficient: number }[] | undefined,
    groupType: GroupType,
  ): Promise<{ examType: ID; coefficient: number }[]> {
    if (!newExams) return groupType.exams;

    const groupDocs = await this.groupRepo.findManyByGroupTypes([groupType._id], {
      populate: ["levels"],
    });

    groupDocs.forEach(group => {
      GroupService.ensureSingleLevelForExamsOfGroup({ newExams, group });
    });

    const newExamTypeNewIds = newExams.map(exam => exam.examTypeNewId);

    const newExamTypes = await this.examTypeRepo.findManyByNewIdsOrThrow(
      newExamTypeNewIds,
      "notFound.examType",
    );

    const newExamTypeIds = newExamTypes.map(exam => exam._id);

    const examTypeToBeRemovedIds = ClassTypeService.identifyRemovedExamTypeIds(
      groupType.exams,
      newExamTypeIds,
    );

    const groupIds = groupDocs.map(group => group._id);

    await this.examGradeRepo.deleteManyByGroupAndExamTypes({
      groupIds,
      examTypeIds: examTypeToBeRemovedIds,
    });

    const examTypeToBeAdded = ClassTypeService.identifyAddedExamTypes(
      groupType.exams,
      newExamTypes,
    );

    const examTypeToBeAddedIds = examTypeToBeAdded.map(exam => exam._id);
    const groupTermsIds = groupDocs.map(group => {
      const termsIds = group.levels.at(0)?.currentSchoolYear.terms.map(term => term._id);
      if (!termsIds) throw new InternalError("Term not found for group");
      return { _id: group._id, termsIds, students: group.students };
    });

    await this.examGradeRepo.addManyByGroups({
      groups: groupTermsIds,
      examTypesIds: examTypeToBeAddedIds,
    });

    return newExams.map(exam => {
      const examType = newExamTypes.find(examType => examType.newId === exam.examTypeNewId);
      if (!examType) throw new InternalError("examType notFound");
      return { examType: examType._id, coefficient: exam.coefficient };
    });
  }
}
