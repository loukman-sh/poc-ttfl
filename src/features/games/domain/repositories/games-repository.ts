import { GetPlayersParamsEntity } from "../entities/get-players-params-entity";
import { PlayerEntity } from "../entities/player-entity";
import { ScheduleEntity } from "../entities/schedule-entity";

export abstract class GamesRepository {
  abstract getSchedule(): Promise<ScheduleEntity>;
  abstract getPlayers(params: GetPlayersParamsEntity): Promise<PlayerEntity[]>;
}
