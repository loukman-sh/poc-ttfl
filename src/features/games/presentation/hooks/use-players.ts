import { useQuery } from "@tanstack/react-query";
import container from "@/core/di/injection-container";
import { AppQueryKeys } from "@/core/constants/app-query-keys";
import { GetPlayersUsecase } from "../../domain/usecases/get-players-usecase";
import { GetPlayersParamsEntity } from "../../domain/entities/get-players-params-entity";

export const usePlayers = (params: GetPlayersParamsEntity) => {
  const getPlayersUsecase = container.get(GetPlayersUsecase);

  return useQuery({
    queryKey: [AppQueryKeys.players, params],
    queryFn: async () => {
      const result = await getPlayersUsecase.execute(params);

      if (result.isSuccess) {
        return result.data;
      }

      throw new Error(result.message);
    },
  });
};
