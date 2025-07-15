import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { AuthorizationService } from "./Authorization.service";
import { Role, SUPER_ADMIN_ROLE } from "./role.entity";

describe("Authorization Service", () => {
  describe("isSuperAdmin", () => {
    it("should return true if the admin is a super admin", () => {
      const superAdmin = {
        roles: [{ name: SUPER_ADMIN_ROLE }],
      } as unknown as { roles: Role[] };

      const result = AuthorizationService.isSuperAdmin(superAdmin);

      expect(result).toBe(true);
    });

    it("should return false if the admin is not a super admin", () => {
      const simpleAdmin = {
        roles: [{ name: "admin" }],
      } as unknown as { roles: Role[] };

      const result = AuthorizationService.isSuperAdmin(simpleAdmin);

      expect(result).toBe(false);
    });
  });

  describe("isActionAllowed", () => {
    it("should return true if user is super admin", () => {
      const superAdminUser = {
        roles: [
          {
            name: SUPER_ADMIN_ROLE,
            permissions: [],
            userTypes: [END_USER_ENUM.MASTER],
          },
        ],
      } as unknown as { roles: Role[] };

      const isAllowed = AuthorizationService.isActionAllowed(
        superAdminUser,
        ACTION_ENUM.ASSIGN,
        RESOURCES_ENUM.STUDENT,
      );

      expect(isAllowed).toBe(true);
    });

    it("should return true if user is not super admin but has permission", () => {
      const user = {
        roles: [
          {
            name: "admin",
            permissions: [`${ACTION_ENUM.ASSIGN}_${RESOURCES_ENUM.STUDENT}`],
            userTypes: [END_USER_ENUM.ADMIN],
          },
        ],
      } as unknown as { roles: Role[] };

      const isAllowed = AuthorizationService.isActionAllowed(
        user,
        ACTION_ENUM.ASSIGN,
        RESOURCES_ENUM.STUDENT,
      );

      expect(isAllowed).toBe(true);
    });

    it("should return false if user is not super admin and does not have permission", () => {
      const user = {
        roles: [
          {
            name: "admin",
            permissions: [],
            userTypes: [END_USER_ENUM.ADMIN],
          },
        ],
      } as unknown as { roles: Role[] };

      const isAllowed = AuthorizationService.isActionAllowed(
        user,
        ACTION_ENUM.ASSIGN,
        RESOURCES_ENUM.STUDENT,
      );

      expect(isAllowed).toBe(false);
    });
  });
});
