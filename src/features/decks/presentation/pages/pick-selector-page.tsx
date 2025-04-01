import {
  Dimensions,
  FlatList,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppText } from "@/core/design/components/atoms/app-text";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { formatDate, isSameDay } from "@/core/utils/date-utils";
import { useSchedule } from "@/features/games/presentation/hooks/use-schedule";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AppRadius } from "@/core/design/theme/app-radius";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { AppPageView } from "@/core/design/components/atoms/app-page-view";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { ScheduleGameEntity } from "@/features/games/domain/entities/schedule-entity";
import { usePlayers } from "@/features/games/presentation/hooks/use-players";
import { GamesList } from "../components/games-list-component";
import { TeamRosters } from "../components/team-rosters-component";
import { AppIcon } from "@/core/design/components/atoms/app-icon";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
export const PickSelectorPage = () => {
  const { colorScheme } = useAppColorScheme();
  const styles = useAppStyles(createStyles);
  const { data: schedule } = useSchedule();
  const { gameDate } = useLocalSearchParams<{ gameDate: string }>();
  const date: Date = useMemo(() => new Date(gameDate), [gameDate]);
  const games = useMemo(
    () => schedule?.allGames.filter((game) => isSameDay(game.gameDate, date)),
    [schedule, date]
  );
  const pageViewRef = useRef<ScrollView>(null);
  const [selectedGame, setSelectedGame] = useState<ScheduleGameEntity | null>(
    null
  );
  const { data: players } = usePlayers({
    teamId: selectedGame?.awayTeam.teamId,
  });

  useEffect(() => {
    if (selectedGame) {
      scrollToPlayerSelector();
    } else {
      scrollToGameSelector();
    }
  }, [selectedGame]);

  const scrollToPlayerSelector = () => {
    pageViewRef.current?.scrollTo({
      x: Dimensions.get("window").width,
      y: 0,
      animated: true,
    });
  };

  const scrollToGameSelector = () => {
    pageViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  };

  return (
    <AppPage center>
      <View style={styles.headerContainer}>
        {selectedGame != null && (
          <AppIcon
            name="arrow-back"
            size={24}
            onPress={() => setSelectedGame(null)}
            color={colorScheme.textPrimary}
          />
        )}
        <View>
          <AppText variant="title">Sélectionner un match</AppText>
          <AppText variant="subtitle">
            {formatDate(date, {
              weekday: "long",
              year: "numeric",
            })}
          </AppText>
        </View>
      </View>
      <ScrollView
        ref={pageViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
      >
        <GamesList games={games} onGameSelected={setSelectedGame} />
        <TeamRosters game={selectedGame} />
      </ScrollView>
    </AppPage>
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: AppSpacing.large,
      width: "100%",
      padding: AppSpacing.large,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colorScheme.borderPrimary,
    },
    scrollContainer: {
      width: Dimensions.get("window").width,
      padding: AppSpacing.large,
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
