export class StringUtils {
  static removeArabicLetters(text: string): string {
    const arabicRegex = /[\u0600-\u06FF]/g;
    return text.replace(arabicRegex, "");
  }
  static deleteSpaces(text: string): string {
    return text.replace(/\s/g, "");
  }
}
