import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { Populate } from "../../../core/populateTypes";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { ObservationMetaData } from "./observation.entity";
import { Parent } from "../../parents/domain/parent.entity";
import { Role } from "../../authorization/domain/role.entity";

@injectable()
export class ObservationService {
  static isUserAllowedToViewObservation(
    observation: Populate<ObservationMetaData, "issuer" | "students">,
    userDetails: { user: Omit<BaseUser, "roles"> & { roles: Role[] }; type: TEndUserEnum },
  ): boolean {
    switch (userDetails.type) {
      case END_USER_ENUM.ADMIN:
        return true;
      case END_USER_ENUM.TEACHER:
        return observation.issuer?._id === userDetails.user._id;
      case END_USER_ENUM.STUDENT:
        return observation.students.some(student => student._id === userDetails.user._id);
      case END_USER_ENUM.PARENT:
        const parent = userDetails.user as unknown as Parent;
        return observation.students.some(student =>
          parent.students.some(child => child === student._id),
        );
      default:
        return false;
    }
  }
}
