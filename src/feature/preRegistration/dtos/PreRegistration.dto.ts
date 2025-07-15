import { TPreRegistrationStatuesEnum } from "../domains/preRegistration.entity";
import { PublicPreRegistrationDTO } from "./PublicPreRegistration.dto";

export type PreRegistrationDTO = PublicPreRegistrationDTO & {
  createdAt: Date;
  status: TPreRegistrationStatuesEnum;
  isRegister: boolean;
};
