import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { StyleSheet, View } from "react-native";
import { ColorScheme } from "@/core/design/@types/color-scheme";

export const AppDivider = () => {
  const styles = useAppStyles(createStyles);
  return <View style={styles.divider} />;
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: colorScheme.borderPrimary,
    },
  });
