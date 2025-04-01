import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { ScheduleGameEntity } from "@/features/games/domain/entities/schedule-entity";
import { usePlayers } from "@/features/games/presentation/hooks/use-players";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { PlayersList } from "./players-list-component";

type Props = {
  game: ScheduleGameEntity | null;
};

export const TeamRosters = ({ game }: Props) => {
  const { currentColorScheme } = useAppColorScheme();
  const styles = useAppStyles(createStyles);

  const { data: homeTeamRoster, isLoading: isLoadingHomeTeamRoster } =
    usePlayers({
      teamId: game?.homeTeam.teamId,
    });

  const { data: awayTeamRoster, isLoading: isLoadingAwayTeamRoster } =
    usePlayers({
      teamId: game?.awayTeam.teamId,
    });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToIndex(selectedIndex);
  }, [selectedIndex]);

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * Dimensions.get("window").width,
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={false}
      >
        <View style={styles.pageContainer}>
          <PlayersList
            players={awayTeamRoster ?? []}
            isLoading={isLoadingAwayTeamRoster}
          />
        </View>
        <View style={styles.pageContainer}>
          <PlayersList
            players={homeTeamRoster ?? []}
            isLoading={isLoadingHomeTeamRoster}
          />
        </View>
      </ScrollView>
      <View style={styles.segmentedControlContainer}>
        <SegmentedControl
          values={[
            game?.awayTeam.teamTricode ?? "---",
            game?.homeTeam.teamTricode ?? "---",
          ]}
          appearance={currentColorScheme === "dark" ? "dark" : "light"}
          selectedIndex={selectedIndex}
          onChange={(event) =>
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }
        />
      </View>
    </View>
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get("window").width,
    },
    pageContainer: {
      flex: 1,
      width: Dimensions.get("window").width,
      justifyContent: "center",
      alignItems: "center",
    },
    segmentedControlContainer: {
      padding: AppSpacing.medium,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colorScheme.borderPrimary,
    },
  });
