import { PropsWithChildren } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { AppText } from "@/core/design/components/atoms/app-text";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { AppRadius } from "@/core/design/theme/app-radius";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { AppFontFamily } from "../../theme/app-fonts";

type Props = PropsWithChildren<TouchableOpacityProps> & {
  variant?: "filled" | "outline" | "link" | "transparent";
  textStyle?: TextStyle;
};

export const AppButton = ({
  children,
  textStyle,
  variant = "filled",
  ...props
}: Props) => {
  const styles = useAppStyles(createStyles);

  const getTextStyle = () => {
    switch (variant) {
      case "link":
        return styles.linkText;
      case "transparent":
      case "outline":
        return styles.text;
      default:
        return styles.filledText;
    }
  };
  return (
    <TouchableOpacity
      style={[styles.container, styles[variant], props.style]}
      {...props}
    >
      {typeof children === "string" ? (
        <AppText style={[styles.commonText, getTextStyle(), textStyle]}>
          {children}
        </AppText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

function createStyles(colorScheme: ColorScheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: colorScheme.buttonPrimary,
      borderRadius: AppRadius.rounded,
    },
    commonText: {
      fontFamily: AppFontFamily.ClarityCityMedium,
      paddingHorizontal: AppSpacing.medium,
      paddingVertical: AppSpacing.regular,
    },
    text: {
      color: colorScheme.textPrimary,
    },
    filled: {
      backgroundColor: colorScheme.buttonPrimary,
    },
    filledText: {
      color: colorScheme.buttonTextPrimary,
    },
    outline: {
      backgroundColor: colorScheme.transparent,
      borderWidth: 1,
      borderColor: colorScheme.borderPrimary,
    },
    link: {
      backgroundColor: colorScheme.transparent,
      borderWidth: 0,
    },
    linkText: {
      color: colorScheme.textPrimary,
      textDecorationLine: "underline",
      textDecorationColor: colorScheme.textPrimary,
      textDecorationStyle: "solid",
    },
    transparent: {
      backgroundColor: colorScheme.transparent,
    },
  });
}
