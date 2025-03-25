import { useCallback, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
import { AppRadius } from "@/core/design/theme/app-radius";
import { AppFontFamily, AppFontSize } from "@/core/design/theme/app-fonts";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppIcon } from "@/core/design/components/atoms/app-icon";

type Props = {
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  onLeadingIconPress?: () => void;
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  onTrailingIconPress?: () => void;
} & TextInputProps;

export const AppTextInput = ({
  leadingIcon,
  trailingIcon,
  onLeadingIconPress,
  onTrailingIconPress,
  secureTextEntry,
  ...props
}: Props) => {
  const { colorScheme } = useAppColorScheme();
  const styles = useAppStyles(createStyles);

  const [textIsVisible, setTextVisibility] = useState(!secureTextEntry);

  const toggleTextVisibility = useCallback(() => {
    setTextVisibility(!textIsVisible);
  }, [textIsVisible]);

  return (
    <View style={styles.container}>
      {leadingIcon && (
        <AppIcon
          name={leadingIcon}
          color={colorScheme.textPrimary}
          onPress={onLeadingIconPress}
        />
      )}
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colorScheme.textSecondary}
        secureTextEntry={secureTextEntry && !textIsVisible}
        cursorColor={colorScheme.textPrimary}
        selectionColor={colorScheme.textPrimary}
        {...props}
      />
      {!trailingIcon && secureTextEntry && (
        <TouchableOpacity onPress={toggleTextVisibility}>
          <Ionicons
            name={textIsVisible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={colorScheme.textPrimary}
          />
        </TouchableOpacity>
      )}
      {trailingIcon && (
        <AppIcon
          name={trailingIcon}
          color={colorScheme.textPrimary}
          onPress={onTrailingIconPress}
        />
      )}
    </View>
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: AppSpacing.regular,
      paddingHorizontal: AppSpacing.regular,
      backgroundColor: colorScheme.transparent,
      borderRadius: AppRadius.rounded,
      borderWidth: 1,
      borderColor: colorScheme.borderPrimary,
      height: 48,
    },
    textInput: {
      flex: 1,
      height: "100%",
      verticalAlign: "middle",
      alignItems: "center",
      fontSize: AppFontSize.regular,
      color: colorScheme.textPrimary,
      fontFamily: AppFontFamily.ClarityCity,
    },
  });
