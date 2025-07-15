import { TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { EntityDto } from "../../entity/dto/entity.dto";
import { GroupDto } from "../../groupManagement/dtos/Group.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export const DOCUMENT_SOURCE_ENUM = {
  HOMEWORK: "homework",
  OBSERVATION: "observation",
  SESSION_SUMMARY: "sessionSummary",
} as const;
export type TDocumentSourceEnum = (typeof DOCUMENT_SOURCE_ENUM)[keyof typeof DOCUMENT_SOURCE_ENUM];

export type DocumentFilterDto = {
  teachers: UserProfileDTO[];
  subjectTypes: EntityDto[];
  groups: GroupDto[];
  sources: TDocumentSourceEnum[];
};

export type DocumentDto = {
  name: string;
  documents: { name: string; link: string; mimeType: string }[];
  documentCount: number;
  createdAt: Date;
  source: { type: TDocumentSourceEnum; newId: string; _id: ID };
  userName: string | null;
  userType: PickFromEnum<TEndUserEnum, "admin" | "teacher"> | null;
};
