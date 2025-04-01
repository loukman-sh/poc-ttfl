import { inject, injectable } from "inversify";
import { DecksRepository } from "@/features/decks/domain/repositories/decks-repository";
import { DecksDatasource } from "@/features/decks/data/datasources/decks-datasource";
import { PickEntity } from "@/features/decks/domain/entities/pick-entity";
import {
  pickModelToEntity,
  updatePickParamsModelFromEntity,
} from "@/features/decks/data/adapters/decks-adapters";
import { GetPicksParamsEntity } from "@/features/decks/domain/entities/get-picks-params-entity";
import { UpdatePickParamsEntity } from "@/features/decks/domain/entities/update-pick-params-entity";

@injectable()
export class DecksRepositoryImpl implements DecksRepository {
  constructor(
    @inject(DecksDatasource) private readonly decksDatasource: DecksDatasource
  ) {}

  async getPicks(params?: GetPicksParamsEntity): Promise<PickEntity[]> {
    const response = await this.decksDatasource.getPicks(params);

    return response.map(pickModelToEntity);
  }

  async updatePick(params: UpdatePickParamsEntity): Promise<PickEntity> {
    const paramsModel = updatePickParamsModelFromEntity(params);
    const response = await this.decksDatasource.updatePick(paramsModel);

    return pickModelToEntity(response);
  }
}
