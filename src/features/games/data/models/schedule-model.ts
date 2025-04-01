import {
  convertDateStringToDate,
  isBetweenDates,
  isFutureDate,
} from "@/core/utils/date-utils";
import {
  GameStatus,
  ScheduleEntity,
} from "../../domain/entities/schedule-entity";

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

export function scheduleModelToEntity(model: ScheduleModel): ScheduleEntity {
  return {
    allGames: model.leagueSchedule.gameDates.flatMap((gameDate) =>
      gameDate.games.map((game) => ({
        gameId: game.gameId,
        gameDate: convertDateStringToDate(gameDate.gameDate),
        weekNumber: game.weekNumber,
        status: mapGameStatus(game.gameStatus),
        homeTeam: {
          teamId: game.homeTeam.teamId,
          teamName: game.homeTeam.teamName,
          teamCity: game.homeTeam.teamCity,
          teamTricode: game.homeTeam.teamTricode,
          teamSlug: game.homeTeam.teamSlug,
          wins: game.homeTeam.wins,
          losses: game.homeTeam.losses,
          score: game.homeTeam.score,
          seed: game.homeTeam.seed,
        },
        awayTeam: {
          teamId: game.awayTeam.teamId,
          teamName: game.awayTeam.teamName,
          teamCity: game.awayTeam.teamCity,
          teamTricode: game.awayTeam.teamTricode,
          teamSlug: game.awayTeam.teamSlug,
          wins: game.awayTeam.wins,
          losses: game.awayTeam.losses,
          score: game.awayTeam.score,
          seed: game.awayTeam.seed,
        },
      }))
    ),
    availableWeeks: model.leagueSchedule.weeks
      .filter(filterAvailableWeeks)
      .map(mapScheduleWeekModelToEntity),
    currentWeekIndex: getCurrentWeekIndex(model.leagueSchedule.weeks),
  };
}

/**
 * Filter a list of weeks, removing duplicates and allowing only past weeks, current week and next week.
 */
const filterAvailableWeeks = (
  week: ScheduleWeekModel,
  index: number,
  self: ScheduleWeekModel[]
) => {
  // Check if the week is already in the original list based on the week number
  const isNew =
    index === self.findIndex((w) => w.weekNumber === week.weekNumber);

  // Get the current week number
  const currentWeekIndex = getCurrentWeekIndex(self);

  // Allow current week and next week
  const isAllowedWeek = week.weekNumber <= currentWeekIndex + 1;

  return isNew && isAllowedWeek;
};

/**
 * Get the index of the current week.
 */
function getCurrentWeekIndex(weeks: ScheduleWeekModel[]): number {
  const today = new Date();

  for (const week of weeks) {
    if (isBetweenDates(today, week.startDate, week.endDate)) {
      return week.weekNumber;
    }
  }

  return 0;
}

/**
 * Map a schedule week model to an entity.
 */
function mapScheduleWeekModelToEntity(week: ScheduleWeekModel) {
  return {
    weekNumber: week.weekNumber,
    startDate: new Date(week.startDate),
    endDate: new Date(week.endDate),
    weekDates: getDateRange(new Date(week.startDate), new Date(week.endDate)),
  };
}

/**
 * Get a range of dates between two dates.
 */
function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dateRange: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
}

/**
 * Map a game status number to a game status union type.
 */
function mapGameStatus(status: number): GameStatus {
  switch (status) {
    case 1:
      return "pregame";
    case 2:
      return "live";
    case 3:
      return "final";
    case 4:
      return "postponed";
    default:
      return "tbd";
  }
}
