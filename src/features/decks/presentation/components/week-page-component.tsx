import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AppText } from "@/core/design/components/atoms/app-text";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { ScheduleWeekEntity } from "@/features/games/domain/entities/schedule-entity";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { usePicks } from "../hooks/use-picks";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { PickCard } from "./pick-card-component";
import { AppFontFamily } from "@/core/design/theme/app-fonts";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
type Props = {
  week: ScheduleWeekEntity;
};

export const WeekPage = ({ week }: Props) => {
  const styles = useAppStyles(createStyles);
  const insets = useSafeAreaInsets();

  const getWeekLabel = (week: ScheduleWeekEntity) =>
    `Du ${week.startDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month:
        week.startDate.getMonth() === week.endDate.getMonth()
          ? undefined
          : "short",
    })} au ${week.endDate.toLocaleDateString("fr-FR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;

  return (
    <View style={styles.container}>
      <View style={styles.weekContainer}>
        <AppText variant="title">Semaine {week.weekNumber}</AppText>
        <AppText variant="subtitle">{getWeekLabel(week)}</AppText>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {week.weekDates.map((date) => {
            return <PickCard key={date.toISOString()} gameDate={date} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (colorScheme: ColorScheme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme.backgroundPrimary,
    },
    weekContainer: {
      width: Dimensions.get("window").width,
      padding: AppSpacing.medium,
      gap: AppSpacing.small,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colorScheme.borderPrimary,
    },
    scrollContainer: {
      padding: AppSpacing.medium,
    },
    contentContainer: {
      gap: AppSpacing.large,
      paddingBottom: AppSpacing.large,
    },
  });
