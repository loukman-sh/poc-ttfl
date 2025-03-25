import { LoginRepository } from "@/features/auth/domain/repositories/login-repository";
import LoginParamsEntity from "@/features/auth/domain/entities/login-params-entity";
import { LoginRemoteDatasource } from "@/features/auth/data/datasources/login-remote-datasource";
import LoginResponseEntity from "@/features/auth/domain/entities/login-response-entity";
import { inject, injectable } from "inversify";

@injectable()
export class LoginRepositoryImpl implements LoginRepository {
  constructor(
    @inject(LoginRemoteDatasource)
    private loginRemoteDataSource: LoginRemoteDatasource
  ) {}

  async login(params: LoginParamsEntity): Promise<LoginResponseEntity> {
    const response = await this.loginRemoteDataSource.login(params);

    return {
      id: response.id,
      email: response.email,
    };
  }

  async logout(): Promise<void> {
    await this.loginRemoteDataSource.logout();
  }
}
