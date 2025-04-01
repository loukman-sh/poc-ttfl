import { inject } from "inversify";
import { SignupRepository } from "../../domain/repositories/signup-repository";
import { SignupDatasource } from "../datasources/signup-datasource";
import { SignupParamsModel } from "../models/signup-params-model";

export class SignupRepositoryImpl implements SignupRepository {
  constructor(
    @inject(SignupDatasource)
    private readonly signupDatasource: SignupDatasource
  ) {}

  async signup(params: SignupParamsModel): Promise<void> {
    await this.signupDatasource.signup(params);
  }
}
