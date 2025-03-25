import { inject, injectable } from "inversify";
import { LoginRepository } from "../repositories/login-repository";
import { UsecaseWithoutParams } from "@/core/helpers/usecase";
import { Result } from "@/core/helpers/result";

@injectable()
export class LogoutUseCase extends UsecaseWithoutParams {
  constructor(
    @inject(LoginRepository) private loginRepository: LoginRepository
  ) {
    super();
  }

  async execute(): Promise<Result<void>> {
    try {
      await this.loginRepository?.logout();
      return Result.success();
    } catch (error) {
      return Result.failure("Error logging out");
    }
  }
}
