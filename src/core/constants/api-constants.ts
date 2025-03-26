export const ApiConstants = {
  // BASE URLS
  nbaCdnApiBaseUrl: "https://cdn.nba.com/static/json",
  nbaStatsApiBaseUrl: "https://stats.nba.com",

  // ENDPOINTS
  scheduleEndpoint: "/staticData/scheduleLeagueV2_13.json",
  liveScoreboardEndpoint: "/liveData/scoreboard/todaysScoreboard_00.json",
  getBoxscoreEndpoint: (gameId: string) =>
    `${ApiConstants.nbaCdnApiBaseUrl}/liveData/boxscore/boxscore_${gameId}.json`,
};
