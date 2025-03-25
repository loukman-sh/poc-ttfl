import { LoginRepository } from "@/features/auth/domain/repositories/login-repository";
import LoginParamsEntity from "@/features/auth/domain/entities/login-params-entity";
import { LoginRemoteDatasource } from "@/features/auth/data/datasources/login-remote-datasource";
import LoginResponseEntity from "@/features/auth/domain/entities/login-response-entity";
import { inject, injectable } from "inversify";
import {
  loginParamsModelFromEntity,
  loginResponseModelToEntity,
} from "../adapters/login-adapters";
import LoginParamsModel from "../models/login-params-model";
import LoginResponseModel from "../models/login-response-model";

@injectable()
export class LoginRepositoryImpl implements LoginRepository {
  constructor(
    @inject(LoginRemoteDatasource)
    private loginRemoteDataSource: LoginRemoteDatasource
  ) {}

  async silentLogin(): Promise<LoginResponseEntity> {
    const response: LoginResponseModel =
      await this.loginRemoteDataSource.silentLogin();

    return loginResponseModelToEntity(response);
  }

  async login(params: LoginParamsEntity): Promise<LoginResponseEntity> {
    const loginParams: LoginParamsModel = loginParamsModelFromEntity(params);
    const response: LoginResponseModel = await this.loginRemoteDataSource.login(
      loginParams
    );

    return loginResponseModelToEntity(response);
  }

  async logout(): Promise<void> {
    await this.loginRemoteDataSource.logout();
  }
}
