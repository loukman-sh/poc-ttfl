import { inject, injectable } from "inversify";
import { GamesRepository } from "../repositories/games-repository";
import { Usecase } from "@/core/helpers/usecase";
import { GetPlayersParamsEntity } from "../entities/get-players-params-entity";
import { PlayerEntity } from "../entities/player-entity";
import { Result } from "@/core/helpers/result";

export class GetPlayersUsecase
  implements Usecase<GetPlayersParamsEntity, PlayerEntity[]>
{
  constructor(
    @inject(GamesRepository) private gamesRepository: GamesRepository
  ) {}

  async execute(
    params: GetPlayersParamsEntity
  ): Promise<Result<PlayerEntity[]>> {
    try {
      const players = await this.gamesRepository.getPlayers(params);
      return Result.success(players);
    } catch (error) {
      console.error(error);
      return Result.failure("ERROR");
    }
  }
}
