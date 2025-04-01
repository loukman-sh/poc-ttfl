import { inject, injectable } from "inversify";
import { GamesRepository } from "@/features/games/domain/repositories/games-repository";
import { GamesDataSource } from "@/features/games/data/datasource/games-datasource";
import { ScheduleEntity } from "@/features/games/domain/entities/schedule-entity";
import { scheduleModelToEntity } from "@/features/games/data/models/schedule-model";
import { GetPlayersParamsEntity } from "../../domain/entities/get-players-params-entity";
import { playerModelToEntity } from "../models/player-model";
import { PlayerEntity } from "../../domain/entities/player-entity";
import { getPlayersParamsModelFromEntity } from "../models/get-players-params-model";

@injectable()
export class GamesRepositoryImpl implements GamesRepository {
  constructor(
    @inject(GamesDataSource) private gamesDataSource: GamesDataSource
  ) {}

  async getSchedule(): Promise<ScheduleEntity> {
    const response = await this.gamesDataSource.getSchedule();

    return scheduleModelToEntity(response);
  }

  async getPlayers(params: GetPlayersParamsEntity): Promise<PlayerEntity[]> {
    const paramsModel = getPlayersParamsModelFromEntity(params);

    const response = await this.gamesDataSource.getPlayers(paramsModel);

    return response.map(playerModelToEntity);
  }
}
