export type GameStatus = "live" | "final" | "pregame" | "tbd" | "postponed";

export interface ScheduleEntity {
  availableWeeks: ScheduleWeekEntity[];
  allGames: ScheduleGameEntity[];
  currentWeekIndex: number;
}

export interface ScheduleWeekEntity {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  weekDates: Date[];
}

export interface ScheduleGameEntity {
  gameId: string;
  gameDate: Date;
  weekNumber: number;
  status: GameStatus;
  homeTeam: ScheduleTeamEntity;
  awayTeam: ScheduleTeamEntity;
}

export interface ScheduleTeamEntity {
  teamId: number;
  teamName: string;
  teamCity: string;
  teamTricode: string;
  teamSlug: string;
  wins: number;
  losses: number;
  score: number;
  seed: number;
}
