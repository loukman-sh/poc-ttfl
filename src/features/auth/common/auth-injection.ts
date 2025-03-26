import { Container } from "inversify";
import { LoginRepositoryImpl } from "../data/repositories/login-repository-impl";
import { LoginUseCase } from "../domain/usecases/login-usecase";
import {
  LoginRemoteDatasource,
  LoginRemoteDatasourceImpl,
} from "../data/datasources/login-remote-datasource";
import { LoginRepository } from "../domain/repositories/login-repository";
import { LogoutUseCase } from "../domain/usecases/logout-usecase";
import { SilentLoginUseCase } from "../domain/usecases/silent-login-usecase";

export function injectAuthFeature(container: Container) {
  container.bind<LoginRepository>(LoginRepository).to(LoginRepositoryImpl);
  container
    .bind<LoginRemoteDatasource>(LoginRemoteDatasource)
    .to(LoginRemoteDatasourceImpl);
  container.bind<LoginUseCase>(LoginUseCase).toSelf();
  container.bind<LogoutUseCase>(LogoutUseCase).toSelf();
  container.bind<SilentLoginUseCase>(SilentLoginUseCase).toSelf();
}
