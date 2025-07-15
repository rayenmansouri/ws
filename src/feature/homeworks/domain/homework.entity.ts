import { GenerateMetaData } from "../../../core/populateTypes";
import { THomeworkStatusEnum } from "../../../features/homework/constants/shared/addHomework.constants";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Admin } from "../../admins/domain/admin.entity";
import { Class } from "../../classes/domain/class.entity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";

export type Homework = {
  name: string;
  // sessionGiven: ID | null;
  // sessionToDo: ID | null;
  subjectType: ID | null;
  dueDate: Date;
  subSubjectType: ID | null;
  group: ID | null;
  teacher: ID | null;
  addedByAdmin: ID | null;
  class: ID | null;
  classGroup: ID | null;
  files: IFile[];
  description: string | null;
  status: THomeworkStatusEnum;
} & BaseEntity;

export type HomeworkMetaData = GenerateMetaData<
  Homework,
  {
    subjectType: SubjectType;
    subSubjectType: SubSubjectType;
    group: Group;
    teacher: Teacher;
    addedByAdmin: Admin;
    class: Class;
    classGroup: ClassGroup;
  }
>;
