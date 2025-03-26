import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppText } from "@/core/design/components/atoms/app-text";
import { useSchedule } from "@/features/games/presentation/hooks/use-schedule";

export default function HomePage() {
  const { data, isLoading, error } = useSchedule();

  return (
    <AppPage center>
      {isLoading ? <AppText>Loading...</AppText> : <AppText>Home</AppText>}
    </AppPage>
  );
}
