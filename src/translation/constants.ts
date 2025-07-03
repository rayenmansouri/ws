import { arabicTranslation } from "./arabic";
import { englishTranslation } from "./english";
import { frenchTranslation } from "./french";
import { TranslationObject } from "./translationKeys";

export const LANGUAGE_ENUM = {
  ARABIC: "ar",
  ENGLISH: "en",
  FRENCH: "fr",
} as const;
export type TLanguageEnum = (typeof LANGUAGE_ENUM)[keyof typeof LANGUAGE_ENUM];

export const DEFAULT_LANGUAGE: TLanguageEnum = LANGUAGE_ENUM.ENGLISH;

export const translation: Record<TLanguageEnum, TranslationObject> = {
  en: englishTranslation,
  fr: frenchTranslation,
  ar: arabicTranslation,
};
