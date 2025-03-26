import { ApiConstants } from "@/core/constants/api-constants";
import { RESTClient } from "@/core/helpers/rest-client";
import { BoxscoreModel } from "@/features/games/data/models/boxscore-model";
import { LiveScoreboardModel } from "@/features/games/data/models/live-scoreboard-model";
import { PlayerModel } from "@/features/games/data/models/player-model";
import { ScheduleModel } from "@/features/games/data/models/schedule-model";
import { injectable } from "inversify";
import { BoxscoreParamsModel } from "../models/boxscore-params-model";

export abstract class GamesDataSource {
  abstract getSchedule(): Promise<ScheduleModel>;
  abstract getLiveScoreboard(): Promise<LiveScoreboardModel>;
  abstract getBoxscore(params: BoxscoreParamsModel): Promise<BoxscoreModel>;
  abstract getAllPlayers(): Promise<PlayerModel[]>;
}

@injectable()
export class GamesDataSourceImpl extends GamesDataSource {
  private readonly nbaCdnApiClient: RESTClient;
  private readonly nbaStatsApiClient: RESTClient;

  constructor() {
    super();
    this.nbaCdnApiClient = new RESTClient(ApiConstants.nbaCdnApiBaseUrl);
    this.nbaStatsApiClient = new RESTClient(ApiConstants.nbaStatsApiBaseUrl);
  }

  async getSchedule(): Promise<ScheduleModel> {
    const path = ApiConstants.scheduleEndpoint;
    return await this.nbaCdnApiClient.get({ path });
  }

  getLiveScoreboard(): Promise<LiveScoreboardModel> {
    throw new Error("Method not implemented.");
  }
  getBoxscore(params: BoxscoreParamsModel): Promise<BoxscoreModel> {
    throw new Error("Method not implemented.");
  }
  getAllPlayers(): Promise<PlayerModel[]> {
    throw new Error("Method not implemented.");
  }
}
