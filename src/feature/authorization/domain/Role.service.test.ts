import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { RoleService } from "./Role.service";

describe("Role service", () => {
  describe("validate permissions", () => {
    it("should throw if action or resource are not provided", () => {
      expect(() => RoleService.ensurePermissionsAreValid(["readUser"])).toThrow();
      expect(() => RoleService.ensurePermissionsAreValid(["read_"])).toThrow();
      expect(() => RoleService.ensurePermissionsAreValid(["_user"])).toThrow();
      expect(() => RoleService.ensurePermissionsAreValid(["_"])).toThrow();
    });

    it("should throw if action or resource doesn't exist", () => {
      expect(() =>
        RoleService.ensurePermissionsAreValid([`UNKNOWN_${RESOURCES_ENUM.ADMIN}`]),
      ).toThrow();
      expect(() =>
        RoleService.ensurePermissionsAreValid([`${ACTION_ENUM.ASSIGN}_UNKNOWN`]),
      ).toThrow();
    });

    it("should not throw if action and resource are valid", () => {
      expect(() =>
        RoleService.ensurePermissionsAreValid([`${ACTION_ENUM.ASSIGN}_${RESOURCES_ENUM.ADMIN}`]),
      ).not.toThrow();
    });
  });
});
