import iconv from "iconv-lite";

export const fixArabicLetter = (text: string): string => {
  return iconv.decode(Buffer.from(text, "latin1"), "utf8");
};
