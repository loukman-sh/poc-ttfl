export interface ScheduleModel {
  meta: {
    version: number;
    request: string;
    time: string;
    code: number;
  };
  leagueSchedule: {
    seasonYear: string;
    leagueId: string;
    gameDates: {
      gameDate: string;
      games: ScheduleGameModel[];
    }[];
    weeks: ScheduleWeekModel[];
  };
}

export interface ScheduleGameModel {
  gameId: string;
  gameCode: string;
  gameStatus: number;
  gameStatusText: string;
  gameSequence: number;
  gameDateEst: string;
  gameTimeEst: string;
  gameDateTimeEst: string;
  gameDateUTC: string;
  gameTimeUTC: string;
  gameDateTimeUTC: string;
  awayTeamTime: string;
  homeTeamTime: string;
  day: string;
  monthNum: number;
  weekNumber: number;
  weekName: string;
  ifNecessary: boolean;
  seriesGameNumber: string;
  gameLabel: string;
  gameSubLabel: string;
  seriesText: string;
  arenaName: string;
  arenaState: string;
  arenaCity: string;
  postponedStatus: string;
  branchLink: string;
  gameSubtype: string;
  isNeutral: boolean;
  broadcasters: {
    nationalTvBroadcasters: string[];
    nationalRadioBroadcasters: string[];
    nationalOttBroadcasters: string[];
    homeTvBroadcasters: string[];
    homeRadioBroadcasters: string[];
    homeOttBroadcasters: string[];
    awayTvBroadcasters: string[];
    awayRadioBroadcasters: string[];
    awayOttBroadcasters: string[];
    intlRadioBroadcasters: string[];
    intlTvBroadcasters: {
      broadcasterScope: string;
      broadcasterMedia: string;
      broadcasterId: number;
      broadcasterDisplay: string;
      broadcasterAbbreviation: string;
      broadcasterDescription: string;
      tapeDelayComments: string;
      broadcasterVideoLink: string;
      regionId: number;
      broadcasterTeamId: number;
      broadcasterRanking: number;
    }[];
    intlOttBroadcasters: string[];
  };
  homeTeam: {
    teamId: number;
    teamName: string;
    teamCity: string;
    teamTricode: string;
    teamSlug: string;
    wins: number;
    losses: number;
    score: number;
    seed: number;
  };
  awayTeam: {
    teamId: number;
    teamName: string;
    teamCity: string;
    teamTricode: string;
    teamSlug: string;
    wins: number;
    losses: number;
    score: number;
    seed: number;
  };
  pointsLeaders: {
    personId: number;
    firstName: string;
    lastName: string;
    teamId: number;
    teamCity: string;
    teamName: string;
    teamTricode: string;
    points: number;
  }[];
}

export interface ScheduleWeekModel {
  weekNumber: number;
  weekName: string;
  startDate: string;
  endDate: string;
}
