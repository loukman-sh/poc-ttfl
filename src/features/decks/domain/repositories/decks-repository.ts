import { PickEntity } from "@/features/decks/domain/entities/pick-entity";
import { GetPicksParamsEntity } from "@/features/decks/domain/entities/get-picks-params-entity";
import { UpdatePickParamsEntity } from "../entities/update-pick-params-entity";

export abstract class DecksRepository {
  abstract getPicks(params?: GetPicksParamsEntity): Promise<PickEntity[]>;
  abstract updatePick(params: UpdatePickParamsEntity): Promise<PickEntity>;
}
