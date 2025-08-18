import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER, DNC_PARTICIPANT_REPOSITORY_IDENTIFIER, REPOSITORY_FACTORY_IDENTIFIER } from "../constants";
import { UserTypeEnum } from "./enums";
import { DncParticipantRepository } from "../participant/dnc/dnc.repository";
import { inject } from "../../../core/container/TypedContainer";
import { UserRepository } from "../base-user/domain/base-user.repository";

@Injectable({
    identifier: REPOSITORY_FACTORY_IDENTIFIER,
})
export class RepositoryFactory {
    constructor(
        @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepository: UserRepository,
        @inject(DNC_PARTICIPANT_REPOSITORY_IDENTIFIER) private dncParticipantRepository: DncParticipantRepository,
    ) {}

    getRepository(type: UserTypeEnum) {
        switch (type) {
            case UserTypeEnum.PARTICIPANT:
                return this.dncParticipantRepository;
            default:
                return this.userRepository;
        }
    }
}