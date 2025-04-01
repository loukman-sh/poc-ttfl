import { ActivityIndicator, StyleSheet } from "react-native";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppPageView } from "@/core/design/components/atoms/app-page-view";
import { useSchedule } from "@/features/games/presentation/hooks/use-schedule";
import { WeekPage } from "@/features/decks/presentation/components/week-page-component";
import { usePicks } from "../hooks/use-picks";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { EdgeInsets } from "react-native-safe-area-context";

export default function DecksPage() {
  const styles = useAppStyles(createStyles);

  const { data: schedule, isLoading: isScheduleLoading } = useSchedule();
  const { isLoading: isPicksLoading } = usePicks();

  if (isScheduleLoading || isPicksLoading) {
    return (
      <AppPage center>
        <ActivityIndicator />
      </AppPage>
    );
  }

  return (
    <AppPageView
      contentContainerStyle={styles.contentContainer}
      initialNumToRender={schedule?.availableWeeks.length}
      data={schedule?.availableWeeks}
      initialScrollIndex={
        schedule?.currentWeekIndex ? schedule?.currentWeekIndex - 1 : 0
      }
      renderItem={({ item }) => <WeekPage week={item} />}
    />
  );
}

const createStyles = (colorScheme: ColorScheme, insets: EdgeInsets) =>
  StyleSheet.create({
    contentContainer: {
      backgroundColor: colorScheme.backgroundPrimary,
      paddingTop: insets.top,
    },
  });
