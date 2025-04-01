import { inject, injectable } from "inversify";
import { Usecase } from "@/core/helpers/usecase";
import { Result } from "@/core/helpers/result";
import { SignupParamsEntity } from "@/features/signup/domain/entities/signup-params-entity";
import { SignupRepository } from "@/features/signup/domain/repositories/signup-repository";

@injectable()
export class SignupUseCase implements Usecase<SignupParamsEntity, void> {
  constructor(
    @inject(SignupRepository)
    private readonly signupRepository: SignupRepository
  ) {}

  async execute(params: SignupParamsEntity): Promise<Result<void>> {
    try {
      await this.signupRepository.signup(params);
      return Result.success();
    } catch (error) {
      console.error(error);
      return Result.failure("Error signing up");
    }
  }
}
