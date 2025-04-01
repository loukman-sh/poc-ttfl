import { PlayerEntity } from "../../domain/entities/player-entity";

export interface PlayerModel {
  PERSON_ID: number;
  PLAYER_LAST_NAME: string;
  PLAYER_FIRST_NAME: string;
  PLAYER_SLUG: string;
  TEAM_SLUG: string;
  TEAM_ID: number;
  TEAM_CITY: string;
  TEAM_NAME: string;
  TEAM_ABBREVIATION: string;
  JERSEY_NUMBER: string | null;
  POSITION: string;
  HEIGHT: string;
  WEIGHT: string;
  COLLEGE: string | null;
  COUNTRY: string;
  DRAFT_YEAR: number | null;
  DRAFT_ROUND: number | null;
  DRAFT_NUMBER: number | null;
  ROSTER_STATUS: number;
  FROM_YEAR: string;
  TO_YEAR: string;
  PTS: number;
  REB: number;
  AST: number;
  STATS_TIMEFRAME: string;
}

export function playerModelToEntity(model: PlayerModel): PlayerEntity {
  return {
    playerId: model.PERSON_ID,
    playerFullName: `${model.PLAYER_FIRST_NAME} ${model.PLAYER_LAST_NAME}`,
    playerDisplayName: model.PLAYER_SLUG,
    teamId: model.TEAM_ID,
    teamTricode: model.TEAM_ABBREVIATION,
    teamName: model.TEAM_NAME,
    teamCity: model.TEAM_CITY,
    jerseyNumber: model.JERSEY_NUMBER
      ? parseInt(model.JERSEY_NUMBER)
      : undefined,
  };
}

interface NbaApiResponse {
  resource: string;
  parameters: Record<string, any>;
  resultSets: Array<{
    name: string;
    headers: string[];
    rowSet: any[][];
  }>;
}

export function transformNbaResponseToRecord(
  response: NbaApiResponse,
  resultSetIndex: number = 0
): Record<string, any>[] {
  const resultSet = response.resultSets[resultSetIndex];
  const headers = resultSet.headers;

  return resultSet.rowSet.map((row) => {
    return headers.reduce<Record<string, any>>((acc, header, index) => {
      acc[header] = row[index];
      return acc;
    }, {});
  });
}

// For backward compatibility
export function transformNbaResponseToPlayerModels(
  response: NbaApiResponse
): PlayerModel[] {
  return transformNbaResponseToRecord(response) as PlayerModel[];
}
