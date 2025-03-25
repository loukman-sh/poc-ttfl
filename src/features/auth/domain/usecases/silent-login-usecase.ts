import { inject, injectable } from "inversify";
import { LoginRepository } from "../repositories/login-repository";
import { Usecase } from "@/core/helpers/usecase";
import LoginResponseEntity from "../entities/login-response-entity";
import { Result } from "@/core/helpers/result";

@injectable()
export class SilentLoginUseCase extends Usecase<void, LoginResponseEntity> {
  constructor(
    @inject(LoginRepository) private loginRepository: LoginRepository
  ) {
    super();
  }

  async execute(): Promise<Result<LoginResponseEntity>> {
    try {
      const response = await this.loginRepository?.silentLogin();

      return Result.success(response);
    } catch (error) {
      return Result.failure("Error logging in");
    }
  }
}
