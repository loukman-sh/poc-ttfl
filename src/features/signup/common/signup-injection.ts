import { Container } from "inversify";
import { SignupRepository } from "../domain/repositories/signup-repository";
import { SignupDatasource } from "../data/datasources/signup-datasource";
import { SignupDatasourceImpl } from "../data/datasources/signup-datasource";
import { SignupRepositoryImpl } from "../data/repositories/signup-repository-impl";
import { SignupUseCase } from "../domain/usecases/signup-usecase";

export const injectSignupFeature = (container: Container) => {
  container.bind(SignupRepository).to(SignupRepositoryImpl);
  container.bind(SignupDatasource).to(SignupDatasourceImpl);
  container.bind(SignupUseCase).toSelf();
};
