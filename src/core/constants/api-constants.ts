const CURRENT_SEASON = "2024-25";
const DEFAULT_LEAGUE_ID = "00";

export const ApiConstants = {
  // BASE URLS
  nbaCdnApiBaseUrl: "https://cdn.nba.com/static/json",
  nbaStatsApiBaseUrl: "https://stats.nba.com/stats",

  // DEFAULT HEADERS
  nbaStatsApiHeaders: {
    Referer: "stats.nba.com",
  },

  // ENDPOINTS
  scheduleEndpoint: "/staticData/scheduleLeagueV2_13.json",
  liveScoreboardEndpoint: "/liveData/scoreboard/todaysScoreboard_00.json",
  getBoxscoreEndpoint: (gameId: string) =>
    `${ApiConstants.nbaCdnApiBaseUrl}/liveData/boxscore/boxscore_${gameId}.json`,
  playerIndexEndpoint: "/playerindex",

  // DEFAULT PARAMS
  playerIndexDefaultParams: {
    leagueId: DEFAULT_LEAGUE_ID,
    season: CURRENT_SEASON,
  },
};
