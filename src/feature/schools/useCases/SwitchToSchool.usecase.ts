import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { tokenSecret } from "../../../config";
import { container } from "../../../core/container/container";
import { inject } from "../../../core/container/TypedContainer";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { IMPERSONATION_DURATION } from "../constants/constants";
import { SchoolRepo } from "../domain/School.repo";

@injectable()
export class SwitchToSchoolUsecase {
  constructor(
    @inject("SchoolRepo") private schoolRepo: SchoolRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
  ) {}

  async execute(schoolNewId: string): Promise<string> {
    const school = await this.schoolRepo.findOneByNewIdOrThrow(schoolNewId, "notFound.school");

    const localContainer = container.createChild();
    const connection = await getNewTenantConnection(school.subdomain);
    localContainer.bind("Connection").toConstantValue(connection);
    localContainer.bind("School").toConstantValue(school);

    const adminRepo = localContainer.get("AdminRepo");
    const addAdminUseCase = localContainer.get("AddAdminUseCase");

    let impersonatedAdmin = await adminRepo.findImpersonatedAdmin();

    if (!impersonatedAdmin) {
      const superAdminRole = await this.roleRepo.findSuperAdminRoleOrThrow();
      impersonatedAdmin = await addAdminUseCase.execute({
        firstName: "Impersonated",
        lastName: "Admin",
        email: `impersonated@${school.subdomain}.com`,
        password: "password",
        gender: "male",
        roles: [superAdminRole._id],
        avatar: null,
        isImpersonation: true,
      });
    }

    const token: string = jwt.sign(
      { id: impersonatedAdmin._id.toString(), tenantId: school._id },
      tokenSecret,
      {
        expiresIn: IMPERSONATION_DURATION,
      },
    );

    return token;
  }
}
