import { injectable } from "inversify";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { ObservationRepo } from "../domain/Observation.repo";
import { ObservationService } from "../domain/Observation.service";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ObservationMapper } from "../mappers/Observation.mapper";
import { ObservationDTO } from "../dtos/observation.dto";
import { Role } from "../../authorization/domain/role.entity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ID } from "../../../types/BaseEntity";

@injectable()
export class GetOneObservationUseCase {
  constructor(
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(
    observationNewId: string,
    userDetails: {
      user: Omit<BaseUser, "roles"> & { roles: Role[]; students?: ID[] };
      type: TEndUserEnum;
    },
  ): Promise<ObservationDTO> {
    const observation = await this.observationRepo.findOneByNewIdOrThrow(
      observationNewId,
      "notFound.observation",
      { populate: ["issuer", "students"] },
    );

    let topicName: string | null = null;

    if (observation.session) {
      const session = await this.sessionRepo.findOneById(observation.session, {
        populate: ["subSubjectType", "subjectType", "group"],
      });
      if (session)
        topicName =
          session?.subjectType?.name ||
          session?.subSubjectType?.name ||
          session?.group?.groupType?.name ||
          null;
    }

    if (!ObservationService.isUserAllowedToViewObservation(observation, userDetails))
      throw new BadRequestError("global.accessDenied");

    let data = ObservationMapper.toObservationDTO(observation, topicName);

    if (userDetails.type === END_USER_ENUM.STUDENT) {
      data = { ...data, students: [UserMapper.toUserProfileDTO(userDetails.user)] };
    }
    if (userDetails.type === END_USER_ENUM.PARENT) {
      const child = observation.students.filter(student =>
        userDetails.user.students?.includes(student._id),
      );
      data = { ...data, students: child.map(student => UserMapper.toUserProfileDTO(student)) };
    }

    return data;
  }
}
