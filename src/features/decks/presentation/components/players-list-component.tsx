import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppText } from "@/core/design/components/atoms/app-text";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { AppFontFamily, AppFontSize } from "@/core/design/theme/app-fonts";
import { AppRadius } from "@/core/design/theme/app-radius";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { getPlayerThumbnailUrl } from "@/core/utils/strings-utils";
import { PlayerEntity } from "@/features/games/domain/entities/player-entity";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  players: PlayerEntity[];
  isLoading: boolean;
};

export const PlayersList = ({ players, isLoading }: Props) => {
  const styles = useAppStyles(createStyles);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <AppText>Loading...</AppText>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={players}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={{ uri: getPlayerThumbnailUrl(item.playerId) }}
            style={styles.playerThumbnail}
          />
          <View style={styles.playerInfoContainer}>
            <AppText style={styles.playerName}>{item.playerFullName}</AppText>
            <AppText style={styles.playerTeam}>{item.teamTricode}</AppText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "100%",
    },
    contentContainer: {
      padding: AppSpacing.large,
      width: "100%",
      gap: AppSpacing.large,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: AppSpacing.regular,
      borderWidth: 1,
      width: "100%",
      borderColor: colorScheme.borderPrimary,
      borderRadius: AppRadius.rounded,
      padding: AppSpacing.regular,
    },
    playerThumbnail: {
      width: 48,
      height: 48,
      borderRadius: AppRadius.circle,
    },
    playerInfoContainer: {
      flex: 1,
      gap: AppSpacing.small,
    },
    playerName: {
      fontFamily: AppFontFamily.ClarityCityMedium,
      fontSize: AppFontSize.medium,
    },
    playerTeam: {
      fontFamily: AppFontFamily.ClarityCity,
      fontSize: AppFontSize.small,
      color: colorScheme.textSecondary,
    },
  });
