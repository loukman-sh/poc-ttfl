import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "@/core/design/components/atoms/app-text";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { ScheduleGameEntity } from "@/features/games/domain/entities/schedule-entity";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppRadius } from "@/core/design/theme/app-radius";

type Props = {
  games?: ScheduleGameEntity[];
  onGameSelected?: (game: ScheduleGameEntity) => void;
};

export const GamesList = ({ games, onGameSelected }: Props) => {
  const styles = useAppStyles(createStyles);

  return (
    <FlatList
      contentContainerStyle={styles.scrollContainer}
      data={games}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!onGameSelected}
          style={styles.itemContainer}
          key={item.gameId}
          onPress={() => onGameSelected?.(item)}
        >
          <AppText>
            {item.awayTeam.teamName} @ {item.homeTeam.teamName}
          </AppText>
        </TouchableOpacity>
      )}
    />
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    scrollContainer: {
      width: Dimensions.get("window").width,
      padding: AppSpacing.large,
      gap: AppSpacing.large,
    },
    itemContainer: {
      width: "100%",
      backgroundColor: colorScheme.backgroundPrimary,
      borderRadius: AppRadius.rounded,
      borderWidth: 1,
      borderColor: colorScheme.borderPrimary,
      padding: AppSpacing.medium,
    },
    innerContainer: {
      width: "100%",
      gap: AppSpacing.medium,
    },
  });
