import { capitalizeFirstLetter } from "../../helpers/string.mjs";

export const createUseCaseFile = (useCaseName, useCasePath) => {
  const capitalizedUseCaseName = `${capitalizeFirstLetter(useCaseName)}UseCase`;

  const content = `
  import { injectable } from "inversify";
  
  export type ${useCaseName}UseCaseRequestDto = {}
  @injectable() 
  export class ${capitalizedUseCaseName} {
    constructor() {}

    async execute(dto : ${useCaseName}UseCaseRequestDto):Promise<void> {
      return;
    }
  }`;

  fs.writeFileSync(useCasePath, content);
};
