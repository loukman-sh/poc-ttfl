export interface LiveScoreboardModel {
  meta: {
    version: number;
    request: string;
    time: string;
    code: number;
  };
  scoreboard: {
    gameDate: string;
    leagueId: string;
    leagueName: string;
    games: {
      gameId: string;
      gameCode: string;
      gameStatus: number;
      gameStatusText: string;
      period: number;
      gameClock: string;
      gameTimeUTC: string;
      gameEt: string;
      regulationPeriods: number;
      ifNecessary: boolean;
      seriesGameNumber: string;
      gameLabel: string;
      gameSubLabel: string;
      seriesText: string;
      seriesConference: string;
      poRoundDesc: string;
      gameSubtype: string;
      isNeutral: boolean;
      homeTeam: {
        teamId: number;
        teamName: string;
        teamCity: string;
        teamTricode: string;
        wins: number;
        losses: number;
        score: number;
        seed: null | number;
        inBonus: null | string;
        timeoutsRemaining: number;
        periods: {
          period: number;
          periodType: string;
          score: number;
        }[];
      };
      awayTeam: {
        teamId: number;
        teamName: string;
        teamCity: string;
        teamTricode: string;
        wins: number;
        losses: number;
        score: number;
        seed: null | number;
        inBonus: null | string;
        timeoutsRemaining: number;
        periods: {
          period: number;
          periodType: string;
          score: number;
        }[];
      };
      gameLeaders: {
        homeLeaders: {
          personId: number;
          name: string;
          jerseyNum: string;
          position: string;
          teamTricode: string;
          playerSlug: null | string;
          points: number;
          rebounds: number;
          assists: number;
        };
        awayLeaders: {
          personId: number;
          name: string;
          jerseyNum: string;
          position: string;
          teamTricode: string;
          playerSlug: null | string;
          points: number;
          rebounds: number;
          assists: number;
        };
      };
      pbOdds: {
        team: null | string;
        odds: number;
        suspended: number;
      };
    }[];
  };
}
