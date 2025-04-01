import { Container } from "inversify";
import { DecksDatasource } from "../data/datasources/decks-datasource";
import { DecksDatasourceImpl } from "../data/datasources/decks-datasource";
import { DecksRepository } from "../domain/repositories/decks-repository";
import { DecksRepositoryImpl } from "../data/repositories/decks-repository-impl";
import { GetPicksUsecase } from "../domain/usecases/get-picks-usecase";

export function injectDecksFeature(container: Container) {
  container.bind(DecksDatasource).to(DecksDatasourceImpl);
  container.bind(DecksRepository).to(DecksRepositoryImpl);
  container.bind(GetPicksUsecase).toSelf();
}
