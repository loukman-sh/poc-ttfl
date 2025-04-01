import { inject, injectable } from "inversify";
import { PickModel } from "@/features/decks/data/models/pick-model";
import { SupabaseService } from "@/core/services/supabase-service";
import { GetPicksParamsEntity } from "@/features/decks/domain/entities/get-picks-params-entity";
import { UnexpectedError } from "@/core/helpers/errors";
import { UpdatePickParamsEntity } from "@/features/decks/domain/entities/update-pick-params-entity";
import { GetPicksParamsModel } from "../models/get-picks-params-model";
import { UpdatePickParamsModel } from "../models/update-pick-params-model";

export abstract class DecksDatasource {
  abstract getPicks(params?: GetPicksParamsModel): Promise<PickModel[]>;
  abstract updatePick(params: UpdatePickParamsModel): Promise<PickModel>;
}

@injectable()
export class DecksDatasourceImpl implements DecksDatasource {
  constructor(
    @inject(SupabaseService) private readonly supabaseService: SupabaseService
  ) {}

  async getPicks(params?: GetPicksParamsEntity): Promise<PickModel[]> {
    const query = this.supabaseService.client!.from("pick").select("*");

    if (params?.weekNumber) {
      query.eq("week_number", params.weekNumber);
    }

    const response = await query;

    if (response?.error) {
      throw new UnexpectedError(response.error.message);
    }

    return response?.data as PickModel[];
  }

  async updatePick(params: UpdatePickParamsModel): Promise<PickModel> {
    const response = await this.supabaseService
      .client!.from("pick")
      .upsert(params)
      .eq("game_date", params.gameDate)
      .select()
      .single();

    return response?.data as PickModel;
  }
}
