import { inject, injectable } from "inversify";
import { GamesRepository } from "@/features/games/domain/repositories/games-repository";
import { GamesDataSource } from "@/features/games/data/datasource/games-datasource";

@injectable()
export class GamesRepositoryImpl implements GamesRepository {
  constructor(
    @inject(GamesDataSource) private gamesDataSource: GamesDataSource
  ) {}

  async getSchedule(): Promise<void> {
    console.log("[DEBUG] getSchedule in repository");
    const response = await this.gamesDataSource.getSchedule();
    console.log(response);
  }

  getLiveScoreboard(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getBoxscore(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllPlayers(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
