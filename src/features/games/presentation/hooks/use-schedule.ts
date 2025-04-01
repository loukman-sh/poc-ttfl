import { useQuery } from "@tanstack/react-query";
import container from "@/core/di/injection-container";
import { AppQueryKeys } from "@/core/constants/app-query-keys";
import { GetScheduleUsecase } from "@/features/games/domain/usecases/get-schedule-usecase";

export const useSchedule = () => {
  const getScheduleUsecase = container.get(GetScheduleUsecase);

  return useQuery({
    queryKey: [AppQueryKeys.schedule],
    queryFn: async () => {
      const result = await getScheduleUsecase.execute();

      if (result.isSuccess) {
        return result.data;
      }

      throw new Error(result.message);
    },
  });
};
