import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { AppText } from "@/core/design/components/atoms/app-text";
import { usePicks } from "../hooks/use-picks";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
import { AppIcon } from "@/core/design/components/atoms/app-icon";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { formatDate, isPastDate } from "@/core/utils/date-utils";
import { router } from "expo-router";
import { AppFontFamily, AppFontSize } from "@/core/design/theme/app-fonts";

type Props = {
  gameDate: Date;
};

export const PickCard = ({ gameDate }: Props) => {
  const { data: pick } = usePicks({ gameDate });
  const { colorScheme } = useAppColorScheme();
  const styles = useAppStyles(createStyles);

  const openPickSelector = () => {
    router.push({
      pathname: "/pick",
      params: {
        gameDate: gameDate.toISOString(),
      },
    });
  };

  const pickIsDisabled = isPastDate(gameDate);

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{formatDate(gameDate)}</AppText>
      <TouchableOpacity
        disabled={pickIsDisabled}
        onPress={openPickSelector}
        key={gameDate.toISOString()}
        style={[
          styles.selectorContainer,
          pick ? styles.selectedContainer : styles.unselectedContainer,
        ]}
      >
        {pick ? (
          <AppIcon
            name="checkmark-done"
            size={24}
            color={colorScheme.buttonTextPrimary}
          />
        ) : (
          <View style={styles.textContainer}>
            <AppIcon
              name={pickIsDisabled ? "lock-closed" : "add"}
              size={24}
              color={colorScheme.textPrimary}
            />
            <AppText>
              {pickIsDisabled
                ? "Aucun joueur sélectionné"
                : "Sélectionner un joueur"}
            </AppText>
            {isPastDate(gameDate) && <AppText style={styles.score}>0</AppText>}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: AppSpacing.regular,
    },
    label: {
      fontFamily: AppFontFamily.ClarityCityMedium,
      color: colorScheme.textSecondary,
    },
    selectorContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 12,
      width: "100%",
      padding: AppSpacing.medium,
    },
    selectedContainer: {
      backgroundColor: colorScheme.buttonPrimary,
      borderWidth: 0,
    },
    unselectedContainer: {
      backgroundColor: colorScheme.backgroundPrimary,
      borderWidth: 1,
      borderColor: colorScheme.borderPrimary,
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: AppSpacing.small,
    },
    score: {
      flex: 1,
      textAlign: "right",
      fontFamily: AppFontFamily.ClarityCityMedium,
      fontSize: AppFontSize.large,
      color: colorScheme.textPrimary,
    },
  });
