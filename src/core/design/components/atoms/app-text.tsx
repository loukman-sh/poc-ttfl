import { StyleSheet, Text, TextProps } from "react-native";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppFontFamily, AppFontSize } from "@/core/design/theme/app-fonts";

type Props = TextProps & {
  variant?: "title" | "subtitle" | "body";
};

export const AppText = ({ children, variant = "body", ...props }: Props) => {
  const styles = useAppStyles(createStyles);

  return (
    <Text {...props} style={[styles.common, styles[variant], props.style]}>
      {children}
    </Text>
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    common: {
      color: colorScheme.textPrimary,
      fontSize: AppFontSize.regular,
      fontFamily: AppFontFamily.ClarityCity,
    },
    text: {
      color: colorScheme.textPrimary,
    },
    title: {
      fontSize: AppFontSize.extraLarge,
      fontFamily: AppFontFamily.ClarityCityBold,
    },
    subtitle: {
      fontSize: AppFontSize.large,
      fontFamily: AppFontFamily.ClarityCitySemiBold,
    },
    body: {
      fontSize: AppFontSize.regular,
    },
  });
