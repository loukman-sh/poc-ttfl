import { ApiConstants } from "@/core/constants/api-constants";
import { GetPlayersParamsEntity } from "../../domain/entities/get-players-params-entity";

export interface GetPlayersParamsModel {
  leagueId?: string;
  season?: string;
  teamId?: string;
}

export function getPlayersParamsModelFromEntity(
  entity: GetPlayersParamsEntity
): GetPlayersParamsModel {
  const { leagueId, season } = ApiConstants.playerIndexDefaultParams;

  const playerParamsModel: GetPlayersParamsModel = {
    leagueId,
    season,
  };

  if (entity.teamId) {
    playerParamsModel.teamId = entity.teamId.toString();
  }

  return playerParamsModel;
}
