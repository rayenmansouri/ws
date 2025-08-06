import { TypedContainer } from "../TypedContainer";
import { UpdateSchoolUseCase } from "../../../feature/schools/useCases/UpdateSchool.usecase";
import { AddSchoolUseCase } from "../../../feature/schools/useCases/AddSchool.usecase";
import { ListSchoolsUseCase } from "../../../feature/schools/useCases/ListSchools.usecase";
import { GetSchoolDetailsUseCase } from "../../../feature/schools/useCases/GetSchoolInformation.usecase";
import { SwitchToSchoolUsecase } from "../../../feature/schools/useCases/SwitchToSchool.usecase";
import { UpdateFlagsUseCase } from "../../../feature/schools/useCases/UpdateFlags.usecase";
import { UpdateSmsSoldUseCase } from "../../../feature/schools/useCases/UpdateSmsSold.usecase";
import { MongoSchoolRepo } from "../../../newDatabase/mongo/repositories/MongoSchool.repo";

export function registerSchoolDependencies(container: TypedContainer): void {
  // Register School Use Cases
  container.bind("UpdateSchoolUseCase").to(UpdateSchoolUseCase).inSingletonScope();
  container.bind("AddSchoolUseCase").to(AddSchoolUseCase).inSingletonScope();
  container.bind("ListSchoolsUseCase").to(ListSchoolsUseCase).inSingletonScope();
  container.bind("GetSchoolDetailsUseCase").to(GetSchoolDetailsUseCase).inSingletonScope();
  container.bind("SwitchToSchoolUsecase").to(SwitchToSchoolUsecase).inSingletonScope();
  container.bind("UpdateFlagsUseCase").to(UpdateFlagsUseCase).inSingletonScope();
  container.bind("UpdateSmsSoldUseCase").to(UpdateSmsSoldUseCase).inSingletonScope();
  
  // Register School Repositories
  container.bind("SchoolRepo").to(MongoSchoolRepo).inSingletonScope();
} 