import { ApiConstants } from "@/core/constants/api-constants";
import { RESTClient } from "@/core/helpers/rest-client";
import { PlayerModel } from "@/features/games/data/models/player-model";
import { ScheduleModel } from "@/features/games/data/models/schedule-model";
import { injectable } from "inversify";
import { GetPlayersParamsModel } from "../models/get-players-params-model";

export abstract class GamesDataSource {
  abstract getSchedule(): Promise<ScheduleModel>;
  abstract getPlayers(params: GetPlayersParamsModel): Promise<PlayerModel[]>;
}

@injectable()
export class GamesDataSourceImpl extends GamesDataSource {
  private readonly nbaCdnApiClient: RESTClient;
  private readonly nbaStatsApiClient: RESTClient;

  constructor() {
    super();
    this.nbaCdnApiClient = new RESTClient(ApiConstants.nbaCdnApiBaseUrl);
    this.nbaStatsApiClient = new RESTClient(
      ApiConstants.nbaStatsApiBaseUrl,
      ApiConstants.nbaStatsApiHeaders
    );
  }

  async getSchedule(): Promise<ScheduleModel> {
    const path = ApiConstants.scheduleEndpoint;
    return await this.nbaCdnApiClient.get({ path });
  }

  async getPlayers(params: GetPlayersParamsModel): Promise<PlayerModel[]> {
    const path = ApiConstants.playerIndexEndpoint;
    return await this.nbaStatsApiClient.get({
      path,
      params: {
        ...ApiConstants.playerIndexDefaultParams,
        ...params,
      },
      shouldTransformResponse: true,
    });
  }
}
