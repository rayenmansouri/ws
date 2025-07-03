import { SafeParseSuccess } from "zod";
import { CustomValidation } from "./custom.validation";

describe("sanitizeHTML", () => {
  it("removes unsafe tags", () => {
    const input = '<script>alert("xss")</script><b>bold</b>';
    const result = CustomValidation.validateHTML().safeParse(input);
    expect(result.success).toBe(true);
    expect((result as SafeParseSuccess<string>).data).toBe("<b>bold</b>");
  });

  it("allows safe attributes", () => {
    const input = '<a href="https://example.com">link</a>';
    const result = CustomValidation.validateHTML().safeParse(input);
    expect((result as SafeParseSuccess<string>).data).toBe(
      '<a href="https://example.com">link</a>',
    );
  });
});
