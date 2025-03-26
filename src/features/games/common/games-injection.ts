import { Container } from "inversify";
import { GamesRepository } from "@/features/games/domain/repositories/games-repository";
import { GamesRepositoryImpl } from "@/features/games/data/repositories/games-repository-impl";
import {
  GamesDataSource,
  GamesDataSourceImpl,
} from "@/features/games/data/datasource/games-datasource";
import { GetScheduleUsecase } from "@/features/games/domain/usecases/get-schedule-usecase";

export function injectGamesFeature(container: Container) {
  container.bind<GamesRepository>(GamesRepository).to(GamesRepositoryImpl);
  container.bind<GamesDataSource>(GamesDataSource).to(GamesDataSourceImpl);
  container.bind<GetScheduleUsecase>(GetScheduleUsecase).toSelf();
}
