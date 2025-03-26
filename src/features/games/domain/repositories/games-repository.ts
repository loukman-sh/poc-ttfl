export abstract class GamesRepository {
  abstract getSchedule(): Promise<void>;
  abstract getLiveScoreboard(): Promise<void>;
  abstract getBoxscore(): Promise<void>;
  abstract getAllPlayers(): Promise<void>;
}
