import { PropsWithChildren } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { EdgeInsets, SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<
  ViewProps & {
    center?: boolean;
  }
>;

export const AppPage = ({ children, center, style, ...props }: Props) => {
  const styles = useAppStyles(createStyles);

  return (
    <SafeAreaView
      edges={["top"]}
      style={[center && styles.centered, styles.container, style]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

const createStyles = (colorScheme: ColorScheme, insets: EdgeInsets) =>
  StyleSheet.create({
    centered: {
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      backgroundColor: colorScheme.backgroundPrimary,
      flex: 1,
    },
  });
