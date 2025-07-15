import { UserService } from "./User.service";

describe("User service", () => {
  describe("generateFullName", () => {
    it("it should return the full name", () => {
      const firstName = "hello";
      const lastName = "world";

      expect(UserService.generateFullName(firstName, lastName)).toBe(`${firstName} ${lastName}`);
    });
  });
});
