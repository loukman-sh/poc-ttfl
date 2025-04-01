import { useQuery } from "@tanstack/react-query";
import { GetPicksUsecase } from "@/features/decks/domain/usecases/get-picks-usecase";
import container from "@/core/di/injection-container";
import { AppQueryKeys } from "@/core/constants/app-query-keys";
import { GetPicksParamsEntity } from "@/features/decks/domain/entities/get-picks-params-entity";

export const usePicks = (params?: GetPicksParamsEntity) => {
  return useQuery({
    queryKey: [AppQueryKeys.picks, AppQueryKeys.picks],
    queryFn: async () => {
      const getPicksUsecase = container.get(GetPicksUsecase);

      const result = await getPicksUsecase.execute(params ?? {});

      if (result.isSuccess) {
        return result.data ?? [];
      }

      throw new Error(result.message);
    },
    select: (data) => {
      if (params?.gameDate) {
        return data.find(
          (pick) => pick.gameDate.getTime() === params?.gameDate?.getTime()
        );
      }

      if (params?.weekNumber) {
        return data.filter((pick) => pick.weekNumber === params?.weekNumber);
      }

      return data;
    },
  });
};
