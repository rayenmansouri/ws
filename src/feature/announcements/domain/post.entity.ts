import { TEndUserEnum, TEndUserWithoutMasterEnums } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Class } from "../../classes/domain/class.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { Level } from "../../levels/domains/level.entity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Post = {
  author: ID;
  authorType: TEndUserEnum;
  attachments: IFile[];
  media: IFile[];
  content: string | null;
  isCommentsAllowed: boolean;
  isPinned: boolean;
  pinnedAt: Date | null;
  isPublic: boolean;
  // will be removed after the migration
  audiences: {
    userTypes: TEndUserWithoutMasterEnums[];
  }[];
  userTypes: TEndUserWithoutMasterEnums[];
  category: TCategoriesEnum | null;
  levels: ID[] | null;
  classes: ID[] | null;
  groups: ID[] | null;
  isScheduled: boolean;
  scheduledAt: Date | null;
  isPublished: boolean;
  publishedAt: Date | null;
  hashTags: string[];
} & BaseEntity;

export type PostMetaData = GenerateMetaData<
  Post,
  {
    author: BaseUser;
    classes: Class[];
    levels: Level[];
    groups: Group[];
  }
>;
export const CATEGORIES_ENUM = {
  general: "general",
  academic: "academic",
  activity: "activity",
  administration: "administration",
  alert: "alert",
} as const;
export type TCategoriesEnum = (typeof CATEGORIES_ENUM)[keyof typeof CATEGORIES_ENUM];
