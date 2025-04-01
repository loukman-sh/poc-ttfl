import { inject, injectable } from "inversify";
import { Result } from "@/core/helpers/result";
import { Usecase } from "@/core/helpers/usecase";
import { GamesRepository } from "@/features/games/domain/repositories/games-repository";
import { ScheduleEntity } from "@/features/games/domain/entities/schedule-entity";

@injectable()
export class GetScheduleUsecase implements Usecase<void, ScheduleEntity> {
  constructor(
    @inject(GamesRepository) private gamesRepository: GamesRepository
  ) {}

  async execute(): Promise<Result<ScheduleEntity>> {
    try {
      const schedule = await this.gamesRepository.getSchedule();
      return Result.success(schedule);
    } catch (error) {
      console.error(error);
      return Result.failure("ERROR");
    }
  }
}
