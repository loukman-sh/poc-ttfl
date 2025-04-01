import { PickEntity } from "../entities/pick-entity";
import { injectable, inject } from "inversify";
import { Usecase } from "@/core/helpers/usecase";
import { DecksRepository } from "../repositories/decks-repository";
import { UpdatePickParamsEntity } from "../entities/update-pick-params-entity";
import { Result } from "@/core/helpers/result";

@injectable()
export class UpdatePickUsecase
  implements Usecase<UpdatePickParamsEntity, PickEntity>
{
  constructor(
    @inject(DecksRepository) private readonly decksRepository: DecksRepository
  ) {}

  async execute(params: UpdatePickParamsEntity): Promise<Result<PickEntity>> {
    try {
      const response = await this.decksRepository.updatePick(params);

      return Result.success(response);
    } catch (error) {
      return Result.failure("Error updating pick with the given params");
    }
  }
}
