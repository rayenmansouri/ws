export class StringUtils {
  static removeArabicLetters(text: string): string {
    const arabicRegex = /[\u0600-\u06FF]/g;

    const textWithoutArabicLetters = text.replace(arabicRegex, "");

    return textWithoutArabicLetters;
  }
}
