import { TLanguageEnum, translation } from "../constants";
import { TranslationPaths } from "../translationKeys";

//TODO this need to be strongly typed
export const translate = (
  key: TranslationPaths | (string & {}),
  language: TLanguageEnum,
): string | undefined => {
  const paths = key.split(".");
  let translatedMessage: any = translation[language];

  while (paths.length > 0 && translatedMessage) {
    translatedMessage = translatedMessage[paths[0]];
    paths.shift();
  }

  return translatedMessage as string | undefined;
};
