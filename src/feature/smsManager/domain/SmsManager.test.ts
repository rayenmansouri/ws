import { School } from "../../schools/domain/school.entity";
import { ISms } from "../sms/sms.interface";
import { SmsManager } from "./SmsManager";

describe("SmsManager", () => {
  let smsManager: SmsManager;
  let mockSchool: School;
  let mockBaseSendSms: jest.Mock;
  let mockTemplate: ISms;

  beforeEach(() => {
    mockSchool = { enableSms: true } as School;
    mockBaseSendSms = jest.fn();

    class TestSmsManager extends SmsManager {
      protected baseSendSms = mockBaseSendSms;
    }

    smsManager = new TestSmsManager(mockSchool);
    mockTemplate = {
      generateMessage: (): string => "testing",
    };
  });

  it("should call baseSendSms when enableSms is true", async () => {
    await smsManager.sendSms(mockTemplate, "1234567890");
    expect(mockBaseSendSms).toHaveBeenCalledWith(mockTemplate, "1234567890");
  });

  it("should not call baseSendSms when enableSms is false", async () => {
    mockSchool.enableSms = false;
    await smsManager.sendSms(mockTemplate, "1234567890");
    expect(mockBaseSendSms).not.toHaveBeenCalled();
  });

  it("should catch error when baseSendSms throws", async () => {
    const mockError = new Error("Test error");
    mockBaseSendSms.mockRejectedValue(mockError);

    await expect(smsManager.sendSms(mockTemplate, "1234567890")).resolves.not.toThrow();
  });
});
