import { DecksRepository } from "@/features/decks/domain/repositories/decks-repository";
import { PickEntity } from "../entities/pick-entity";
import { injectable, inject } from "inversify";
import { Usecase } from "@/core/helpers/usecase";
import { Result } from "@/core/helpers/result";
import { GetPicksParamsEntity } from "../entities/get-picks-params-entity";

@injectable()
export class GetPicksUsecase
  implements Usecase<GetPicksParamsEntity | undefined, PickEntity[]>
{
  constructor(
    @inject(DecksRepository) private readonly decksRepository: DecksRepository
  ) {}

  async execute(params?: GetPicksParamsEntity): Promise<Result<PickEntity[]>> {
    try {
      const response = await this.decksRepository.getPicks(params);

      return Result.success(response);
    } catch (error) {
      return Result.failure("Error getting picks");
    }
  }
}
