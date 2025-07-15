import { StringUtils } from "./StringUtils";

describe("String utils", () => {
  describe("remove arabic letters", () => {
    it("Should remover arabic letters and return the new string", () => {
      const textWithArabicLetters = "helloسلامBro";

      const textWithoutArabicLetters = StringUtils.removeArabicLetters(textWithArabicLetters);

      expect(textWithoutArabicLetters).toBe("helloBro");
    });
  });
});
