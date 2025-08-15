import { School } from "../../schools/domain/school.entity";
import { InternalError } from "../../../core/ApplicationErrors";
import { EmailManager } from "./EmailManager";
import { IEmail } from "../emails/email.interface";

describe("Email Manager", () => {
  let emailManager: EmailManager;
  let baseSendEmail: jest.Mock;
  let mockSchool: School;
  let mockEmailTemplate: IEmail;
  const receiverEmail = "test@test.com";

  describe("sendEmail", () => {
    beforeEach(() => {
      baseSendEmail = jest.fn();
      mockSchool = { enableEmail: true } as School;

      class TestEmailManager extends EmailManager {
        protected baseSendEmail = baseSendEmail;
      }

      class MockEmailTemplate implements IEmail {
        subject: string;
        message: string;
        html: string;

        constructor(subject: string, message: string, html: string) {
          this.subject = subject;
          this.message = message;
          this.html = html;
        }
      }

      emailManager = new TestEmailManager(mockSchool);
      mockEmailTemplate = new MockEmailTemplate("subject", "hello", "hello");
    });

    it("Should call baseSendEmail when the school has the email enabled", async () => {
      await emailManager.sendEmail(mockEmailTemplate, receiverEmail);

      expect(baseSendEmail).toHaveBeenCalledWith(mockEmailTemplate, receiverEmail);
    });

    it("Should not call baseSendEmail when the school has the email disabled", async () => {
      mockSchool.enableEmail = false;

      await emailManager.sendEmail(mockEmailTemplate, receiverEmail);

      expect(baseSendEmail).not.toHaveBeenCalled();
    });

    it("Should not throw error if baseSendEmail throws an error", async () => {
      baseSendEmail.mockRejectedValue(new InternalError("global.internalError"));

      await expect(emailManager.sendEmail(mockEmailTemplate, receiverEmail)).resolves.not.toThrow();
    });
  });
});
