import { PickEntity } from "../../domain/entities/pick-entity";
import { UpdatePickParamsEntity } from "../../domain/entities/update-pick-params-entity";
import { PickModel } from "../models/pick-model";
import { UpdatePickParamsModel } from "../models/update-pick-params-model";

export function pickModelFromEntity(pick: PickEntity): PickModel {
  return {
    player_id: pick.playerId,
    game_id: pick.gameId,
    season: pick.season,
    week_number: pick.weekNumber,
    game_date: pick.gameDate.toISOString(),
  };
}

export function pickModelToEntity(pick: PickModel): PickEntity {
  return {
    playerId: pick.player_id,
    gameId: pick.game_id,
    season: pick.season,
    weekNumber: pick.week_number,
    score: pick.score,
    gameDate: new Date(pick.game_date),
  };
}

export function updatePickParamsModelFromEntity(
  params: UpdatePickParamsEntity
): UpdatePickParamsModel {
  return {
    gameDate: params.gameDate.toISOString(),
    weekNumber: params.weekNumber,
    season: params.season,
    playerId: params.playerId,
    gameId: params.gameId,
  };
}
