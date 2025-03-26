import { inject, injectable } from "inversify";
import { GamesRepository } from "../repositories/games-repository";
import { Result } from "@/core/helpers/result";
import { Usecase } from "@/core/helpers/usecase";

@injectable()
export class GetScheduleUsecase implements Usecase<void, void> {
  constructor(
    @inject(GamesRepository) private gamesRepository: GamesRepository
  ) {}

  async execute(): Promise<Result<void>> {
    try {
      await this.gamesRepository.getSchedule();
      return Result.success();
    } catch (error) {
      console.error(error);
      return Result.failure("ERROR");
    }
  }
}
