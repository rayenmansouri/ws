import { ID } from "../../../types/BaseEntity";
import { Issue } from "./issue.entity";
import { IssueService } from "./Issue.service";

describe("Issue service", () => {
  describe("isUserAllowedToViewIssue", () => {
    it("Should return true if user type is admin", () => {
      const isAllowed = IssueService.isUserAllowedToViewIssue(
        {
          userType: "admin",
          userId: "" as ID,
        },
        {} as Issue,
      );

      expect(isAllowed).toBe(true);
    });

    it("Should return true if user type is parent and the issue is authored by same parent", () => {
      const isAllowed = IssueService.isUserAllowedToViewIssue(
        {
          userType: "parent",
          userId: "id1" as ID,
        },
        {
          author: "id1",
        } as Issue,
      );

      expect(isAllowed).toBe(true);
    });

    it("Should return false if user type is parent and the issue is authored by a different parent", () => {
      const isAllowed = IssueService.isUserAllowedToViewIssue(
        {
          userType: "parent",
          userId: "id1" as ID,
        },
        {
          author: "id2",
        } as Issue,
      );

      expect(isAllowed).toBe(false);
    });

    it("Should return true if user type is teacher and the issue is forwarded to the teacher", () => {
      const isAllowed = IssueService.isUserAllowedToViewIssue(
        {
          userType: "teacher",
          userId: "id1" as ID,
        },
        {
          teacher: "id1",
          isForwarded: true,
        } as Issue,
      );

      expect(isAllowed).toBe(true);
    });

    it("Should return false if user type is teacher and the issue is forwarded to another teacher", () => {
      const isAllowed = IssueService.isUserAllowedToViewIssue(
        {
          userType: "teacher",
          userId: "id1" as ID,
        },
        {
          teacher: "id2",
          isForwarded: true,
        } as Issue,
      );

      expect(isAllowed).toBe(false);
    });

    it("Should return false if user type is teacher and the issue is not yet forwarded to the teacher", () => {
      const isAllowed = IssueService.isUserAllowedToViewIssue(
        {
          userType: "teacher",
          userId: "id1" as ID,
        },
        {
          teacher: "id1",
          isForwarded: false,
        } as Issue,
      );

      expect(isAllowed).toBe(false);
    });
  });
});
