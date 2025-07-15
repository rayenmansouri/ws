import { GenerateMetaData } from "../../../core/populateTypes";
import { ID, BaseEntity } from "../../../types/BaseEntity";
import { SessionType } from "../../sessionTypes/domains/sessionType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";

export type Classroom = {
  name: string;
  allowAllSubjects: boolean;
  allowAllSessionTypes: boolean;
  subjectTypes: ID[];
  sessionTypes: ID[];
} & BaseEntity;

export type ClassroomMetaData = GenerateMetaData<
  Classroom,
  {
    sessionTypes: SessionType[];
    subjectTypes: SubjectType[];
  }
>;
