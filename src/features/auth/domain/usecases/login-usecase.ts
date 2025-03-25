import { inject, injectable } from "inversify";
import LoginParamsEntity from "../entities/login-params-entity";
import { LoginRepository } from "../repositories/login-repository";
import { Usecase } from "@/core/helpers/usecase";
import LoginResponseEntity from "../entities/login-response-entity";
import { Result } from "@/core/helpers/result";

@injectable()
export class LoginUseCase extends Usecase<
  LoginParamsEntity,
  LoginResponseEntity
> {
  constructor(
    @inject(LoginRepository) private loginRepository: LoginRepository
  ) {
    super();
  }

  async execute(
    params: LoginParamsEntity
  ): Promise<Result<LoginResponseEntity>> {
    try {
      const response = await this.loginRepository?.login(params);

      return Result.success(response);
    } catch (error) {
      return Result.failure("Error logging in");
    }
  }
}
