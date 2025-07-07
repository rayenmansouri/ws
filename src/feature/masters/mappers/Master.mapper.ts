import { Populate } from "../../../core/populateTypes";
import { MasterMetaData } from "../domain/master.entity";
import { MasterDTO } from "../dtos/master.dto";

export class MasterMapper {
  static toMasterDTO(master: Populate<MasterMetaData, "roles">): MasterDTO {
    return {
      _id: master._id,
      newId: master.newId,
      firstName: master.firstName,
      lastName: master.lastName,
      fullName: master.fullName,
      birthDate: master.birthDate,
      avatar: master.avatar.link,
      gender: master.gender,
      email: master.email,
      phoneNumber: master.phoneNumber,
      roles: master.roles.map(role => ({
        _id: role._id,
        newId: role.newId,
        name: role.name,
      })),
    };
  }
}
