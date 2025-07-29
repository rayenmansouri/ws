import { TLanguageEnum } from "../../../translation/constants";
import { Role } from "../../authorization/domain/role.entity";
import { FeatureFlagService } from "../../schools/domain/FeatureFlag.service";
import { School } from "../../schools/domain/school.entity";
import { BaseUser } from "../domain/baseUser.entity";
import { BaseListUserDTO } from "../dtos/BaseListUser.dto";
import { CurrentUserDTO } from "../dtos/CurrentUser.dto";
import { UserProfileDTO } from "./../dtos/userProfile.dto";

type ToCurrentUserDTOParams = {
  user: Omit<BaseUser, "roles"> & { roles: Role[] };
  school: School;
  unseenNotification: number;
  unseenConversations: number;
  language: TLanguageEnum;
};

export class UserMapper {
  static toUserProfileDTO(
    user: Pick<BaseUser, "_id" | "newId" | "fullName" | "email" | "phoneNumber"> & {
      avatar: Pick<BaseUser["avatar"], "link">;
    },
  ): UserProfileDTO {
    return {
      _id: user._id,
      newId: user.newId,
      fullName: user.fullName,
      avatar: user.avatar.link,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }

  static toCurrentUserDTO({
    user,
    school,
    unseenNotification,
    unseenConversations,
    language,
  }: ToCurrentUserDTOParams): CurrentUserDTO {
    return {
      _id: user._id,
      newId: user.newId,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      avatar: user.avatar.link,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address1: user.address1,
      address2: user.address2,
      birthDate: user.birthDate,
      gender: user.gender,
      roles: user.roles.map(role => ({
        _id: role._id,
        newId: role.newId,
        name: role.translation[language],
        permissions: role.permissions,
      })),
      schoolId: school._id,
      schoolLogo: school.logo,
      schoolCover: school.cover,
      schoolName: school.name,
      schoolSubdomain: school.subdomain,
      taxRate: school.taxRate,
      unseenNotification,
      unseenConversations,
      featureFlags: FeatureFlagService.getSchoolFeatureFlags(school),
      schedule: school.schedule,
    };
  }

  static toBaseListUserDTO(user: BaseUser): BaseListUserDTO {
    return {
      ...this.toUserProfileDTO(user),
      address1: user.address1,
      address2: user.address2,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      isActive: user.isActive,
      isArchived: user.isArchived,
      gender: user.gender,
    };
  }
}
